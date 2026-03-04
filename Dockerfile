# ==========================================
# Stage 1: Base Image & Security
# ==========================================
# Pinning specific version for stability (Alpine 1.25)
FROM nginx:1.25.3-alpine AS base

# Install curl for healthchecks
RUN apk add --no-cache curl

# Create a non-root user (Nginx usually has 'nginx' user, but we enforce specific UID/GID)
# Alpine Nginx image already has 'nginx' user (101), we will use it.

# ==========================================
# Stage 2: Configuration & Content
# ==========================================
FROM base AS production

# Copy custom Nginx config with Strict Security Headers (CSP, X-Frame-Options)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Removing default Nginx static files to keep it clean
RUN rm -rf /usr/share/nginx/html/*

# Copy project files (In a real build, this would be 'COPY --from=builder /app/dist ...')
# For now, we copy the source directly as we are migrating to Vite shortly.
COPY . /usr/share/nginx/html

# ==========================================
# Stage 3: Runtime Hardening
# ==========================================

# Change ownership to non-root user
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

# Switch to non-root user
USER nginx

# Expose port (Must be > 1024 for non-root)
EXPOSE 8080

# Healthcheck to ensure integrity
HEALTHCHECK --interval=30s --timeout=3s \
    CMD curl -f http://localhost:8080/ || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
