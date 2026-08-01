/**
 * CLOUD COMPUTING LABS - Knowledge AIO
 * ===================================
 *
 * Declarative terminal-lab scripts for the `cloud-computing` topic, keyed by
 * lesson.id. Consumed by LabEngine as the applied beat inside a LessonV2 lesson.
 *
 * Doctrine §1.4: pure `export default`, NO imports. Fully declarative — plain
 * objects, strings, and regex SOURCE strings only (LabEngine compiles them with
 * `new RegExp`; no functions, no eval). Every command a learner types is matched
 * by goal (setState), not by exact string, and a wrong command never aborts.
 *
 * Terminal flavour: aws / gcloud / az CLI, with realistic JSON, table and error
 * output. All account ids, ARNs, IPs and hostnames are documentation-range or
 * fictional placeholders; no secrets and no destructive commands.
 *
 * Step shape:
 *   { id, promptEn, hintTerm?, accept:[...], acceptRe?:[...], stdout, setState, hints? }
 * Lab shape:
 *   { title, intro, cwd0, vocab:[...], requires:{...}, steps:[...] }
 */

export default {
  // ─── LEVEL 0 · Regions & Zones — first-run setup ──────────────────────────
  cloud_foundations_4: {
    title: 'Choose the Region before anything is provisioned',
    intro:
      'Il nuovo servizio tratta dati di clienti italiani che per contratto devono restare in Italia. / The new service handles Italian customer data that, by contract, must stay in Italy. Nothing has been created yet — pick the Region first, because moving a live workload later is a migration, not a setting.',
    cwd0: '/home/dev',
    vocab: ['Region', 'Availability Zone', 'Data Residency', 'Region Pair', 'Failover'],
    requires: {
      regions_listed: true,
      current_region: 'us-east-1',
      default_region: 'eu-south-1',
      azs_checked: true,
      pair_checked: true,
    },
    steps: [
      {
        id: 's1',
        promptEn: 'List every AWS Region so you can see where this workload could legally live.',
        hintTerm: 'Region',
        accept: [
          'aws ec2 describe-regions',
          'aws ec2 describe-regions --output table',
          'aws ec2 describe-regions --all-regions',
        ],
        acceptRe: ['^aws\\s+ec2\\s+describe-regions(?![\\w-])'],
        stdout:
          '{\n' +
          '    "Regions": [\n' +
          '        {\n' +
          '            "RegionName": "eu-central-1",\n' +
          '            "Endpoint": "ec2.eu-central-1.amazonaws.com",\n' +
          '            "OptInStatus": "opt-in-not-required"\n' +
          '        },\n' +
          '        {\n' +
          '            "RegionName": "eu-south-1",\n' +
          '            "Endpoint": "ec2.eu-south-1.amazonaws.com",\n' +
          '            "OptInStatus": "opted-in"\n' +
          '        },\n' +
          '        {\n' +
          '            "RegionName": "eu-west-1",\n' +
          '            "Endpoint": "ec2.eu-west-1.amazonaws.com",\n' +
          '            "OptInStatus": "opt-in-not-required"\n' +
          '        },\n' +
          '        {\n' +
          '            "RegionName": "us-east-1",\n' +
          '            "Endpoint": "ec2.us-east-1.amazonaws.com",\n' +
          '            "OptInStatus": "opt-in-not-required"\n' +
          '        }\n' +
          '    ]\n' +
          '}',
        setState: { regions_listed: true },
        hints: [
          'Before you deploy anything, ask the provider where it can host it — this is a read-only call.',
          'It is an `aws ec2 describe-…` command about places, not machines.',
          'aws ec2 describe-regions',
        ],
      },
      {
        id: 's2',
        promptEn:
          'Print the configuration your CLI would use right now — which Region would a create command land in?',
        hintTerm: 'Data Residency',
        accept: [
          'aws configure list',
          'aws configure get region',
          'aws configure get default.region',
        ],
        acceptRe: ['^aws\\s+configure\\s+(list|get\\s+(default\\.)?region)(?![\\w-])'],
        stdout:
          '      Name                    Value             Type    Location\n' +
          '      ----                    -----             ----    --------\n' +
          '   profile                <not set>             None    None\n' +
          'access_key     ****************H7QP shared-credentials-file\n' +
          'secret_key     ****************0kLm shared-credentials-file\n' +
          '    region                us-east-1      config-file    ~/.aws/config',
        setState: { current_region: 'us-east-1' },
        hints: [
          'The default Region already lives in ~/.aws/config — read it back before you trust it.',
          'Start with `aws configure …`',
          'aws configure list',
        ],
      },
      {
        id: 's3',
        promptEn:
          'us-east-1 is North Virginia — wrong continent for this data. Point the CLI at eu-south-1 (Milan) and print the value back to prove it stuck.',
        hintTerm: 'Data Residency',
        accept: [
          'aws configure set region eu-south-1 && aws configure get region',
          'aws configure set default.region eu-south-1 && aws configure get region',
          'aws configure set region eu-south-1',
        ],
        acceptRe: ['^aws\\s+configure\\s+set\\s+(default\\.)?region\\s+eu-south-1\\b'],
        stdout: 'eu-south-1',
        setState: { default_region: 'eu-south-1' },
        hints: [
          'The Region has to change in the config file, not just in your head — and the write prints nothing, so read it back.',
          '`aws configure set …` writes the value, `aws configure get …` reads it.',
          'aws configure set region eu-south-1 && aws configure get region',
        ],
      },
      {
        id: 's4',
        promptEn:
          'List the Availability Zones of the Milan Region — you need at least two to survive a data-center failure.',
        hintTerm: 'Availability Zone',
        accept: [
          'aws ec2 describe-availability-zones',
          'aws ec2 describe-availability-zones --region eu-south-1',
          'aws ec2 describe-availability-zones --output table',
        ],
        acceptRe: ['^aws\\s+ec2\\s+describe-availability-zones(?![\\w-])'],
        stdout:
          '{\n' +
          '    "AvailabilityZones": [\n' +
          '        {\n' +
          '            "State": "available",\n' +
          '            "ZoneName": "eu-south-1a",\n' +
          '            "ZoneId": "eus1-az1",\n' +
          '            "ZoneType": "availability-zone",\n' +
          '            "RegionName": "eu-south-1"\n' +
          '        },\n' +
          '        {\n' +
          '            "State": "available",\n' +
          '            "ZoneName": "eu-south-1b",\n' +
          '            "ZoneId": "eus1-az2",\n' +
          '            "ZoneType": "availability-zone",\n' +
          '            "RegionName": "eu-south-1"\n' +
          '        },\n' +
          '        {\n' +
          '            "State": "available",\n' +
          '            "ZoneName": "eu-south-1c",\n' +
          '            "ZoneId": "eus1-az3",\n' +
          '            "ZoneType": "availability-zone",\n' +
          '            "RegionName": "eu-south-1"\n' +
          '        }\n' +
          '    ]\n' +
          '}',
        setState: { azs_checked: true },
        hints: [
          'A Region is made of several isolated data centers — ask for their list.',
          'Same verb as step 1 (`aws ec2 describe-…`), but about zones.',
          'aws ec2 describe-availability-zones',
        ],
      },
      {
        id: 's5',
        promptEn:
          'The DR plan fails over to Frankfurt. Confirm that eu-central-1 is enabled for this account.',
        hintTerm: 'Region Pair',
        accept: [
          'aws ec2 describe-regions --region-names eu-central-1',
          'aws ec2 describe-regions --filters Name=region-name,Values=eu-central-1',
          'aws ec2 describe-regions --region-names eu-central-1 --output table',
        ],
        acceptRe: ['^aws\\s+ec2\\s+describe-regions(?![\\w-]).*eu-central-1'],
        stdout:
          '{\n' +
          '    "Regions": [\n' +
          '        {\n' +
          '            "RegionName": "eu-central-1",\n' +
          '            "Endpoint": "ec2.eu-central-1.amazonaws.com",\n' +
          '            "OptInStatus": "opt-in-not-required"\n' +
          '        }\n' +
          '    ]\n' +
          '}',
        setState: { pair_checked: true },
        hints: [
          'Ask about one Region only — the one you would fail over to.',
          'Reuse describe-regions, but narrow it with `--region-names …`',
          'aws ec2 describe-regions --region-names eu-central-1',
        ],
      },
    ],
  },

  // ─── LEVEL 1 · Virtual Machines — inspect the fleet you inherited ─────────
  cloud_compute_1: {
    title: 'Take inventory of the fleet you inherited',
    intro:
      'Il collega che gestiva le macchine se ne e andato ieri e nessuno sa cosa sia ancora acceso. / The colleague who ran the machines left yesterday and nobody knows what is still running, or in which cloud. Take inventory before the monthly invoice arrives.',
    cwd0: '/home/dev',
    vocab: ['Instance', 'EC2', 'Virtual Machine', 'Compute Engine', 'Bastion Host', 'Snapshot'],
    requires: {
      ec2_listed: true,
      gcp_listed: true,
      azure_listed: true,
      bastion: 'connected',
      snapshot: 'pending',
    },
    steps: [
      {
        id: 's1',
        promptEn: 'List every running EC2 Instance in the account.',
        hintTerm: 'EC2',
        accept: [
          'aws ec2 describe-instances --filters Name=instance-state-name,Values=running',
          'aws ec2 describe-instances',
          'aws ec2 describe-instances --filters Name=instance-state-name,Values=running --output table',
        ],
        acceptRe: ['^aws\\s+ec2\\s+describe-instances(?![\\w-])'],
        stdout:
          '{\n' +
          '    "Reservations": [\n' +
          '        {\n' +
          '            "Instances": [\n' +
          '                {\n' +
          '                    "InstanceId": "i-0a3f9c21b7de45f80",\n' +
          '                    "InstanceType": "t3.medium",\n' +
          '                    "State": { "Name": "running" },\n' +
          '                    "PrivateIpAddress": "10.0.1.11",\n' +
          '                    "PublicIpAddress": "203.0.113.24",\n' +
          '                    "SubnetId": "subnet-0a1b2c3d",\n' +
          '                    "Tags": [ { "Key": "Name", "Value": "web-01" } ]\n' +
          '                }\n' +
          '            ]\n' +
          '        },\n' +
          '        {\n' +
          '            "Instances": [\n' +
          '                {\n' +
          '                    "InstanceId": "i-07c2e5a4d9b13068f",\n' +
          '                    "InstanceType": "m5.large",\n' +
          '                    "State": { "Name": "running" },\n' +
          '                    "PrivateIpAddress": "10.0.1.20",\n' +
          '                    "SubnetId": "subnet-0e4f5a6b",\n' +
          '                    "BlockDeviceMappings": [\n' +
          '                        {\n' +
          '                            "DeviceName": "/dev/xvda",\n' +
          '                            "Ebs": { "VolumeId": "vol-0b7e4d19c33f28a51", "Status": "attached" }\n' +
          '                        }\n' +
          '                    ],\n' +
          '                    "Tags": [ { "Key": "Name", "Value": "legacy-ci" } ]\n' +
          '                }\n' +
          '            ]\n' +
          '        }\n' +
          '    ]\n' +
          '}',
        setState: { ec2_listed: true },
        hints: [
          'You want a description of the compute instances the account is paying for.',
          'The EC2 read command is `aws ec2 describe-…` and the noun is plural.',
          'aws ec2 describe-instances --filters Name=instance-state-name,Values=running',
        ],
      },
      {
        id: 's2',
        promptEn:
          'The invoice also shows Google Cloud. List the Compute Engine VMs in the current project.',
        hintTerm: 'Compute Engine',
        accept: ['gcloud compute instances list', 'gcloud compute instances list --sort-by=name'],
        acceptRe: ['^gcloud\\s+compute\\s+instances\\s+list(?![\\w-])'],
        stdout:
          'NAME            ZONE            MACHINE_TYPE   PREEMPTIBLE  INTERNAL_IP  EXTERNAL_IP   STATUS\n' +
          'batch-worker-1  europe-west8-b  e2-standard-4               10.132.0.12  203.0.113.51  RUNNING\n' +
          'batch-worker-2  europe-west8-b  e2-standard-4               10.132.0.13                TERMINATED\n' +
          'gpu-trainer-1   europe-west8-c  a2-highgpu-1g  true         10.132.0.21                RUNNING',
        setState: { gcp_listed: true },
        hints: [
          'Same question, different provider: Google calls its virtual machines Compute Engine instances.',
          'The Google CLI is `gcloud`, and the verb for read-only inventory is `list`.',
          'gcloud compute instances list',
        ],
      },
      {
        id: 's3',
        promptEn:
          'Finance mentions an Azure subscription too. List its Virtual Machines as a table.',
        hintTerm: 'Virtual Machine',
        accept: ['az vm list --output table', 'az vm list -o table', 'az vm list'],
        acceptRe: ['^az\\s+vm\\s+list(?![\\w-])'],
        stdout:
          'Name          ResourceGroup    Location     Zones\n' +
          '------------  ---------------  -----------  -------\n' +
          'legacy-dc-01  rg-legacy        westeurope   1\n' +
          'build-agent   rg-ci            northeurope',
        setState: { azure_listed: true },
        hints: [
          'Third provider, same inventory question — ask Azure which virtual machines the subscription owns.',
          'The Azure CLI is `az`, and `--output table` makes it readable.',
          'az vm list --output table',
        ],
      },
      {
        id: 's4',
        promptEn:
          'i-07c2e5a4d9b13068f (10.0.1.20) has no public address. Reach it through the Bastion Host bastion.example.com as ec2-user, using the key bastion.pem.',
        hintTerm: 'Bastion Host',
        accept: [
          'ssh -i bastion.pem -J ec2-user@bastion.example.com ec2-user@10.0.1.20',
          'ssh -J ec2-user@bastion.example.com ec2-user@10.0.1.20',
        ],
        acceptRe: ['^ssh\\s+.*bastion\\.example\\.com.*10\\.0\\.1\\.20'],
        stdout:
          "Warning: Permanently added 'bastion.example.com' (ED25519) to the list of known hosts.\n" +
          'Last login: Tue Jul 28 07:12:44 2026 from 10.0.1.9\n' +
          'Amazon Linux 2023, kernel 6.1.109-118.189.amzn2023.x86_64\n' +
          '[ec2-user@ip-10-0-1-20 ~]$',
        setState: { bastion: 'connected' },
        hints: [
          'A private instance is reached by jumping through the hardened host that sits in the public subnet.',
          'It is an `ssh` command with a jump host: `-J user@jump-host` plus `-i key.pem`.',
          'ssh -i bastion.pem -J ec2-user@bastion.example.com ec2-user@10.0.1.20',
        ],
      },
      {
        id: 's5',
        promptEn:
          'Before anyone touches that legacy box, take a point-in-time Snapshot of its root volume vol-0b7e4d19c33f28a51.',
        hintTerm: 'Snapshot',
        accept: [
          'aws ec2 create-snapshot --volume-id vol-0b7e4d19c33f28a51',
          'aws ec2 create-snapshot --volume-id vol-0b7e4d19c33f28a51 --description "legacy-ci pre-audit"',
        ],
        acceptRe: ['^aws\\s+ec2\\s+create-snapshot\\b.*--volume-id\\s+vol-'],
        stdout:
          '{\n' +
          '    "SnapshotId": "snap-0c41f9a27ed3b5860",\n' +
          '    "VolumeId": "vol-0b7e4d19c33f28a51",\n' +
          '    "State": "pending",\n' +
          '    "StartTime": "2026-07-28T07:19:31+00:00",\n' +
          '    "Progress": "",\n' +
          '    "OwnerId": "123456789012",\n' +
          '    "VolumeSize": 100,\n' +
          '    "Encrypted": true\n' +
          '}',
        setState: { snapshot: 'pending' },
        hints: [
          'You want a frozen copy of the disk you can restore from — the volume id is in the output of step 1.',
          '`aws ec2 create-…` on the volume, with `--volume-id`.',
          'aws ec2 create-snapshot --volume-id vol-0b7e4d19c33f28a51',
        ],
      },
    ],
  },

  // ─── LEVEL 1 · Auto Scaling — build it and verify it scaled ───────────────
  cloud_compute_3: {
    title: 'Make the web tier survive tomorrow morning',
    intro:
      'Il marketing lancia la campagna domani alle 09:00 e il web tier e una sola VM creata a mano. / Marketing launches the campaign tomorrow at 09:00 and the web tier is a single hand-made VM. Build an Auto Scaling Group that grows with the traffic, then prove it actually scaled.',
    cwd0: '/home/dev/infra',
    vocab: [
      'Launch Template',
      'Auto Scaling Group',
      'Capacity',
      'Scaling Policy',
      'Target Tracking',
      'Scale Out',
      'Health Check',
    ],
    requires: {
      launch_template: 'web-lt',
      asg: 'web-asg',
      policy: 'cpu70',
      scaled_out: true,
      health_checked: true,
    },
    steps: [
      {
        id: 's1',
        promptEn:
          'Freeze the AMI, instance type and user-data into a versioned Launch Template named web-lt, described as v1, from template.json.',
        hintTerm: 'Launch Template',
        accept: [
          'aws ec2 create-launch-template --launch-template-name web-lt --version-description v1 --launch-template-data file://template.json',
          'aws ec2 create-launch-template --launch-template-name web-lt --launch-template-data file://template.json',
        ],
        acceptRe: ['^aws\\s+ec2\\s+create-launch-template\\b.*web-lt'],
        stdout:
          '{\n' +
          '    "LaunchTemplate": {\n' +
          '        "LaunchTemplateId": "lt-0d92a4c71fb35e806",\n' +
          '        "LaunchTemplateName": "web-lt",\n' +
          '        "CreateTime": "2026-07-28T16:04:11+00:00",\n' +
          '        "CreatedBy": "arn:aws:iam::123456789012:user/deployer",\n' +
          '        "DefaultVersionNumber": 1,\n' +
          '        "LatestVersionNumber": 1\n' +
          '    }\n' +
          '}',
        setState: { launch_template: 'web-lt' },
        hints: [
          'The group needs one recipe to stamp identical instances from — create that recipe first.',
          'It is an `aws ec2 create-launch-template …` call reading `file://template.json`.',
          'aws ec2 create-launch-template --launch-template-name web-lt --version-description v1 --launch-template-data file://template.json',
        ],
      },
      {
        id: 's2',
        promptEn:
          'Create the Auto Scaling Group web-asg from that template with minimum 2, maximum 10 and desired Capacity 3, then read the group back (the create call itself prints nothing).',
        hintTerm: 'Auto Scaling Group',
        accept: [
          'aws autoscaling create-auto-scaling-group --auto-scaling-group-name web-asg --min-size 2 --max-size 10 --desired-capacity 3 --launch-template LaunchTemplateName=web-lt && aws autoscaling describe-auto-scaling-groups --auto-scaling-group-names web-asg',
          'aws autoscaling create-auto-scaling-group --auto-scaling-group-name web-asg --min-size 2 --max-size 10 --desired-capacity 3 --launch-template LaunchTemplateName=web-lt',
          'aws autoscaling create-auto-scaling-group --auto-scaling-group-name web-asg --min-size 2 --max-size 10 --desired-capacity 3 --launch-template LaunchTemplateName=web-lt --vpc-zone-identifier subnet-0a1b2c3d,subnet-0e4f5a6b',
        ],
        acceptRe: ['^aws\\s+autoscaling\\s+create-auto-scaling-group\\b.*web-asg'],
        stdout:
          '{\n' +
          '    "AutoScalingGroups": [\n' +
          '        {\n' +
          '            "AutoScalingGroupName": "web-asg",\n' +
          '            "LaunchTemplate": { "LaunchTemplateName": "web-lt", "Version": "$Default" },\n' +
          '            "MinSize": 2,\n' +
          '            "MaxSize": 10,\n' +
          '            "DesiredCapacity": 3,\n' +
          '            "DefaultCooldown": 300,\n' +
          '            "HealthCheckType": "EC2",\n' +
          '            "HealthCheckGracePeriod": 300,\n' +
          '            "AvailabilityZones": [ "eu-south-1a", "eu-south-1b" ],\n' +
          '            "Instances": [\n' +
          '                { "InstanceId": "i-0f21c4a9e7b60d3a5", "AvailabilityZone": "eu-south-1a", "LifecycleState": "Pending", "HealthStatus": "Healthy" },\n' +
          '                { "InstanceId": "i-0c58b3e11d9a4f720", "AvailabilityZone": "eu-south-1b", "LifecycleState": "Pending", "HealthStatus": "Healthy" },\n' +
          '                { "InstanceId": "i-04ae7d2f6c8019b3e", "AvailabilityZone": "eu-south-1a", "LifecycleState": "Pending", "HealthStatus": "Healthy" }\n' +
          '            ]\n' +
          '        }\n' +
          '    ]\n' +
          '}',
        setState: { asg: 'web-asg' },
        hints: [
          'The group is what owns the minimum, maximum and desired number of instances — create it from the template you just made.',
          'Start with `aws autoscaling create-auto-scaling-group --auto-scaling-group-name web-asg …` and pass --min-size, --max-size, --desired-capacity.',
          'aws autoscaling create-auto-scaling-group --auto-scaling-group-name web-asg --min-size 2 --max-size 10 --desired-capacity 3 --launch-template LaunchTemplateName=web-lt',
        ],
      },
      {
        id: 's3',
        promptEn:
          'Attach a Target Tracking Scaling Policy called cpu70 to web-asg, configured from tt.json, so the group keeps average CPU near 70%.',
        hintTerm: 'Scaling Policy',
        accept: [
          'aws autoscaling put-scaling-policy --auto-scaling-group-name web-asg --policy-name cpu70 --policy-type TargetTrackingScaling --target-tracking-configuration file://tt.json',
        ],
        acceptRe: ['^aws\\s+autoscaling\\s+put-scaling-policy\\b.*cpu70'],
        stdout:
          '{\n' +
          '    "PolicyARN": "arn:aws:autoscaling:eu-south-1:123456789012:scalingPolicy:6b1f7d40-2c9e-4a55-b0d3-71f8ae4c6b12:autoScalingGroupName/web-asg:policyName/cpu70",\n' +
          '    "Alarms": [\n' +
          '        {\n' +
          '            "AlarmName": "TargetTracking-web-asg-AlarmHigh-9f2c1d84",\n' +
          '            "AlarmARN": "arn:aws:cloudwatch:eu-south-1:123456789012:alarm:TargetTracking-web-asg-AlarmHigh-9f2c1d84"\n' +
          '        },\n' +
          '        {\n' +
          '            "AlarmName": "TargetTracking-web-asg-AlarmLow-3ad70e12",\n' +
          '            "AlarmARN": "arn:aws:cloudwatch:eu-south-1:123456789012:alarm:TargetTracking-web-asg-AlarmLow-3ad70e12"\n' +
          '        }\n' +
          '    ]\n' +
          '}',
        setState: { policy: 'cpu70' },
        hints: [
          'A group with fixed capacity never grows — give it the rule that decides when to add instances.',
          '`aws autoscaling put-scaling-policy …` with --policy-type TargetTrackingScaling.',
          'aws autoscaling put-scaling-policy --auto-scaling-group-name web-asg --policy-name cpu70 --policy-type TargetTrackingScaling --target-tracking-configuration file://tt.json',
        ],
      },
      {
        id: 's4',
        promptEn:
          'The campaign went live and CPU spiked. Show the scaling activities of web-asg to prove the group scaled out.',
        hintTerm: 'Scale Out',
        accept: [
          'aws autoscaling describe-scaling-activities --auto-scaling-group-name web-asg',
          'aws autoscaling describe-scaling-activities --auto-scaling-group-name web-asg --max-items 5',
        ],
        acceptRe: ['^aws\\s+autoscaling\\s+describe-scaling-activities(?![\\w-])'],
        stdout:
          '{\n' +
          '    "Activities": [\n' +
          '        {\n' +
          '            "ActivityId": "8a7c1e42-9b30-4f6d-b1c8-2d5e0f7a9341",\n' +
          '            "AutoScalingGroupName": "web-asg",\n' +
          '            "Description": "Launching a new EC2 instance: i-0b93d4f18ca6e2705",\n' +
          '            "Cause": "At 2026-07-29T09:07:11Z a monitor alarm TargetTracking-web-asg-AlarmHigh-9f2c1d84 in state ALARM triggered policy cpu70 changing the desired capacity from 3 to 4.",\n' +
          '            "StartTime": "2026-07-29T09:07:44.512000+00:00",\n' +
          '            "EndTime": "2026-07-29T09:08:59.006000+00:00",\n' +
          '            "StatusCode": "Successful",\n' +
          '            "Progress": 100\n' +
          '        }\n' +
          '    ]\n' +
          '}',
        setState: { scaled_out: true },
        hints: [
          'The group keeps a log of every instance it launched or terminated, and why — read that log.',
          '`aws autoscaling describe-scaling-…` on the group name.',
          'aws autoscaling describe-scaling-activities --auto-scaling-group-name web-asg',
        ],
      },
      {
        id: 's5',
        promptEn:
          'One node stopped answering. List the group members with their lifecycle state and Health Check status.',
        hintTerm: 'Health Check',
        accept: [
          'aws autoscaling describe-auto-scaling-instances',
          'aws autoscaling describe-auto-scaling-instances --output table',
        ],
        acceptRe: ['^aws\\s+autoscaling\\s+describe-auto-scaling-instances(?![\\w-])'],
        stdout:
          '{\n' +
          '    "AutoScalingInstances": [\n' +
          '        {\n' +
          '            "InstanceId": "i-0f21c4a9e7b60d3a5",\n' +
          '            "AutoScalingGroupName": "web-asg",\n' +
          '            "AvailabilityZone": "eu-south-1a",\n' +
          '            "LifecycleState": "InService",\n' +
          '            "HealthStatus": "HEALTHY"\n' +
          '        },\n' +
          '        {\n' +
          '            "InstanceId": "i-0c58b3e11d9a4f720",\n' +
          '            "AutoScalingGroupName": "web-asg",\n' +
          '            "AvailabilityZone": "eu-south-1b",\n' +
          '            "LifecycleState": "Terminating",\n' +
          '            "HealthStatus": "UNHEALTHY"\n' +
          '        },\n' +
          '        {\n' +
          '            "InstanceId": "i-04ae7d2f6c8019b3e",\n' +
          '            "AutoScalingGroupName": "web-asg",\n' +
          '            "AvailabilityZone": "eu-south-1a",\n' +
          '            "LifecycleState": "InService",\n' +
          '            "HealthStatus": "HEALTHY"\n' +
          '        },\n' +
          '        {\n' +
          '            "InstanceId": "i-0b93d4f18ca6e2705",\n' +
          '            "AutoScalingGroupName": "web-asg",\n' +
          '            "AvailabilityZone": "eu-south-1b",\n' +
          '            "LifecycleState": "InService",\n' +
          '            "HealthStatus": "HEALTHY"\n' +
          '        },\n' +
          '        {\n' +
          '            "InstanceId": "i-0a5d61e8f37c2940b",\n' +
          '            "AutoScalingGroupName": "web-asg",\n' +
          '            "AvailabilityZone": "eu-south-1b",\n' +
          '            "LifecycleState": "Pending",\n' +
          '            "HealthStatus": "HEALTHY"\n' +
          '        }\n' +
          '    ]\n' +
          '}',
        setState: { health_checked: true },
        hints: [
          'Ask the group about its members: the failed one is already being replaced.',
          '`aws autoscaling describe-auto-scaling-…` — the noun is the instances, not the group.',
          'aws autoscaling describe-auto-scaling-instances',
        ],
      },
    ],
  },

  // ─── LEVEL 2 · Object Storage — diagnose and close a public bucket ────────
  cloud_storage_1: {
    title: 'Close the bucket that is open to the world',
    intro:
      'Uno scanner di sicurezza ha segnalato un bucket S3 pubblico dieci minuti prima della demo col cliente. / A security scanner flagged one of your S3 buckets as public, ten minutes before the customer demo. Find the hole, close it, and deliver the file the customer needs the safe way.',
    cwd0: '/home/dev',
    vocab: ['S3', 'Bucket', 'Object', 'Key', 'Public Access', 'Pre-signed URL'],
    requires: {
      buckets_listed: true,
      pab_missing: true,
      policy_seen: true,
      public_access: 'blocked',
      uploaded: true,
      presigned: true,
    },
    steps: [
      {
        id: 's1',
        promptEn: 'List every S3 Bucket in the account so you know what you are dealing with.',
        hintTerm: 'S3',
        accept: ['aws s3 ls', 'aws s3api list-buckets'],
        acceptRe: ['^aws\\s+(s3\\s+ls|s3api\\s+list-buckets)(?![\\w-])(?!\\s+s3://)'],
        stdout:
          '2025-11-04 09:12:41 orbit-app-logs\n' +
          '2026-02-18 14:03:07 orbit-customer-reports\n' +
          '2026-06-30 08:55:22 orbit-tf-state',
        setState: { buckets_listed: true },
        hints: [
          'Start from the inventory: which containers of objects exist at all?',
          'The short S3 command family is `aws s3 …` and the listing verb is two letters.',
          'aws s3 ls',
        ],
      },
      {
        id: 's2',
        promptEn:
          'The scanner flagged orbit-customer-reports. Check whether that bucket has a Public Access block configured.',
        hintTerm: 'Public Access',
        accept: ['aws s3api get-public-access-block --bucket orbit-customer-reports'],
        acceptRe: ['^aws\\s+s3api\\s+get-public-access-block\\b.*orbit-customer-reports'],
        stdout:
          'An error occurred (NoSuchPublicAccessBlockConfiguration) when calling the\n' +
          'GetPublicAccessBlock operation: The public access block configuration was not found',
        setState: { pab_missing: true },
        hints: [
          'There is a dedicated setting whose only job is to refuse public exposure — ask whether it exists here.',
          'The low-level family is `aws s3api …`, and you want to GET the public-access block.',
          'aws s3api get-public-access-block --bucket orbit-customer-reports',
        ],
      },
      {
        id: 's3',
        promptEn:
          'Nothing is blocking it. Read the bucket policy of orbit-customer-reports to see who is actually allowed in.',
        hintTerm: 'Bucket',
        accept: [
          'aws s3api get-bucket-policy --bucket orbit-customer-reports',
          'aws s3api get-bucket-policy --bucket orbit-customer-reports --output text',
        ],
        acceptRe: ['^aws\\s+s3api\\s+get-bucket-policy\\b.*orbit-customer-reports'],
        stdout:
          '{\n' +
          '    "Policy": "{\\"Version\\":\\"2012-10-17\\",\\"Statement\\":[{\\"Sid\\":\\"PublicRead\\",\\"Effect\\":\\"Allow\\",\\"Principal\\":\\"*\\",\\"Action\\":\\"s3:GetObject\\",\\"Resource\\":\\"arn:aws:s3:::orbit-customer-reports/*\\"}]}"\n' +
          '}',
        setState: { policy_seen: true },
        hints: [
          'A bucket carries a document that says who may read its objects — print that document.',
          '`aws s3api get-bucket-…` and the noun is the permissions document.',
          'aws s3api get-bucket-policy --bucket orbit-customer-reports',
        ],
      },
      {
        id: 's4',
        promptEn:
          'Principal "*" means anyone on the internet. Block all four forms of Public Access on the bucket, then read the configuration back.',
        hintTerm: 'Public Access',
        accept: [
          'aws s3api put-public-access-block --bucket orbit-customer-reports --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true && aws s3api get-public-access-block --bucket orbit-customer-reports',
          'aws s3api put-public-access-block --bucket orbit-customer-reports --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true',
        ],
        acceptRe: ['^aws\\s+s3api\\s+put-public-access-block\\b.*orbit-customer-reports'],
        stdout:
          '{\n' +
          '    "PublicAccessBlockConfiguration": {\n' +
          '        "BlockPublicAcls": true,\n' +
          '        "IgnorePublicAcls": true,\n' +
          '        "BlockPublicPolicy": true,\n' +
          '        "RestrictPublicBuckets": true\n' +
          '    }\n' +
          '}',
        setState: { public_access: 'blocked' },
        hints: [
          'Do not argue with the policy — switch on the setting that overrides every public grant, then verify it.',
          'Same command as step 2 but PUT instead of GET, with --public-access-block-configuration all true.',
          'aws s3api put-public-access-block --bucket orbit-customer-reports --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true',
        ],
      },
      {
        id: 's5',
        promptEn:
          'The customer still needs the report. Upload the local file q3-report.pdf as the Object with Key reports/2026/q3-report.pdf in orbit-customer-reports.',
        hintTerm: 'Object',
        accept: [
          'aws s3 cp q3-report.pdf s3://orbit-customer-reports/reports/2026/q3-report.pdf',
          'aws s3 cp ./q3-report.pdf s3://orbit-customer-reports/reports/2026/q3-report.pdf',
        ],
        acceptRe: ['^aws\\s+s3\\s+cp\\s+\\.?/?q3-report\\.pdf\\s+s3://orbit-customer-reports/'],
        stdout:
          'Completed 2.1 MiB/2.1 MiB (3.4 MiB/s) with 1 file(s) remaining\n' +
          'upload: ./q3-report.pdf to s3://orbit-customer-reports/reports/2026/q3-report.pdf',
        setState: { uploaded: true },
        hints: [
          'Copying a local file into a bucket is the same verb you use between two directories.',
          '`aws s3 cp <local file> s3://<bucket>/<key>` — the key is the full path inside the bucket.',
          'aws s3 cp q3-report.pdf s3://orbit-customer-reports/reports/2026/q3-report.pdf',
        ],
      },
      {
        id: 's6',
        promptEn:
          'Share that object without reopening the bucket: generate a Pre-signed URL valid for one hour (3600 seconds).',
        hintTerm: 'Pre-signed URL',
        accept: [
          'aws s3 presign s3://orbit-customer-reports/reports/2026/q3-report.pdf --expires-in 3600',
          'aws s3 presign s3://orbit-customer-reports/reports/2026/q3-report.pdf',
        ],
        acceptRe: ['^aws\\s+s3\\s+presign\\s+s3://orbit-customer-reports/'],
        stdout:
          'https://orbit-customer-reports.s3.eu-south-1.amazonaws.com/reports/2026/q3-report.pdf' +
          '?X-Amz-Algorithm=AWS4-HMAC-SHA256' +
          '&X-Amz-Credential=AKIAIOSFODNN7EXAMPLE%2F20260729%2Feu-south-1%2Fs3%2Faws4_request' +
          '&X-Amz-Date=20260729T101500Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host' +
          '&X-Amz-Signature=3f0c1d2e4a5b6c7d8e9f0a1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4e5f',
        setState: { presigned: true },
        hints: [
          'There is a way to hand out a temporary, signed link instead of making the object public.',
          '`aws s3 presign s3://…` and `--expires-in <seconds>` controls how long it lives.',
          'aws s3 presign s3://orbit-customer-reports/reports/2026/q3-report.pdf --expires-in 3600',
        ],
      },
    ],
  },
};
