---
title: 'Improving CI/CD'
date: 2022-08-09
description: 'A comparison of several CI/CD platforms and overview of DevOps practices used to continously deliver full-stack web applications to end-users at Abyss Solutions'
tags:
  ['CI/CD', 'DevOps', 'React', 'GraphQL', 'NextJS', 'NestJS', 'software', 'web']
---

> This is a post written by me for my work at [Abyss Solutions](https://abysssolutions.co/). Some Github links are to private repositories not accessible by the public. But the concepts described here are transferrable to many software development projects.
>
> Whenever I refer to Fabric V2, think of a web-based ML analytics platform that allows our clients to automatically/continually assess the condition of their assets using computer vision and robotics.

- [Improving CI/CD Across Software Teams at Abyss](#improving-cicd-across-software-teams-at-abyss)
- [Background](#background)
- [Platforms Considered](#platforms-considered)
  - [DroneCI](#droneci)
  - [SemaphoreCI](#semaphoreci)
  - [GitHub Actions](#github-actions)
- [Platform Chosen - SemaphoreCI](#platform-chosen---semaphoreci)
- [Fabric V2](#fabric-v2)
  - [Development](#development)
    - [GitHub repositories](#github-repositories)
    - [Feature branches](#feature-branches)
    - [GitFlow workflow](#gitflow-workflow)
    - [Conventional commits and automating Versioning/Releases](#conventional-commits-and-automating-versioningreleases)
  - [Frontend components](#frontend-components)
  - [Backend components](#backend-components)
  - [Containerisation](#containerisation)
    - [Docker](#docker)
  - [Container Orchestration](#container-orchestration)
    - [EKS](#eks)
    - [ECS](#ecs)
  - [Infrastructure as Code](#infrastructure-as-code)
    - [Terraform](#terraform)
    - [Serverless](#serverless)
  - [Error reporting and performance monitoring](#error-reporting-and-performance-monitoring)
    - [Sentry.io](#sentryio)

# Improving CI/CD Across Software Teams at Abyss

This document will describe current CI/CD practices at Abyss Solutions for software development, specifically for Fabric V2 web at the moment. It will evaluate the current process and try to suggest alternative approaches where applicable for different software projects and teams at Abyss.

# Background

![CI/CD](https://files.imranc.io/static/blog/posts/improving-ci-cd/ci-cd.png)

CI/CD refers to automating workflows related to _continuous integration_ and _continuous delivery_ of software products. As software evolves and new features or capabilities are introduced, there are steps to _integrate_ these features or capabilities into the existing software or codebase. This integration may involve things like ensuring new features do not break existing features, ensuring that the software behaves as expected, ensuring source code is linted, etc.

There are also steps in software development to _deliver_ the latest software to end users. This delivery could involve deploying the software to the end users' machines or deploying the software online and have it be accessible by end users. Modern CI/CD services work to simplify and automate this process of continuously integrating the latest software and continuously delivering that software to end users.

# Platforms Considered

## DroneCI

| **Pros**                                        | **Cons**                                           |
| ----------------------------------------------- | -------------------------------------------------- |
| Open-source                                     | UI was not very intuitive                          |
| Self-hostable                                   | No way to automate promotions; only manual release |
| Plugin system for common technologies/workflows | Limited hardware scalability when self-hosting     |
| Need to manage ourselves when self-hosting      |                                                    |

We initially self-hosted the open-source [**Drone**](https://www.drone.io/) CI/CD platform on our internal office network in Sydney. This was the fastest way to get set up with a CI/CD service without investing money into software and leveraging existing on-premise infrastructure in the Sydney office. This service was managed by our internal IT staff. It could only scale as much as our on-premise hardware could allow without affecting ML and Data Processing workflows that were also sharing the same pool of on-premise hardware.

## SemaphoreCI

| **Pros**                                                                                                     | **Cons**                                                                                                         |
| ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| Already using and pipelines set up                                                                           | Separate from GitHub; needs permissions setup to access GitHub repos or org                                      |
| Overview of pipeline runs across all projects                                                                | Secrets management is global for all semaphore projects; i.e. global secrets accessible by all project pipelines |
| Can build pipelines using web UI visual tool; more convenient than editing config files                      | No first-party templates for common pipelines or steps (that I could find)                                       |
| sem CLI to programmatically interact with the tool                                                           | Rare occasions of support issues in the past                                                                     |
| Reviews show Semaphore pipelines run faster than other CI/CD services                                        |                                                                                                                  |
| Breakdown view of all pipeline steps and their dependencies and breakdown view of logs from individual steps |                                                                                                                  |

We moved to using a paid CI service called [**SemaphoreCI**](https://abyss.semaphoreci.com/) a little over a year ago. It connects to [Abyss Solutions' GitHub org](https://github.com/abyss-solutions/). With it, you can set up pipelines for individual repos in the Abyss GitHub org. These pipelines can run on GitHub triggers, like push to `main` branch. The results of running each pipeline can be seen easily in the GitHub web UI next to the pushed commits (:white_check_mark:) or (:x:). The pipelines run on SemaphoreCI infrastructure and are fairly performant for CI/CD tasks. You can usually see the results of a pipeline a few minutes after new code is pushed to GitHub.

![SemaphoreCI dashboard](https://files.imranc.io/static/blog/posts/improving-ci-cd/semaphore-ci.png)

There are SemaphoreCI pipelines set up for a lot of Abyss software, but the pipelines being run differ vastly from one another. Part of this has to do with the variety of software being developed at Abyss with different programming languages and technologies and requirements under different teams who take ownership of their own CI/CD processes and pipelines.

## GitHub Actions

| **Pros**                                                                                                    | **Cons**                                                                               |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Built into GitHub directly; minimal setup required to activate per repo                                     | Will need to migrate existing SemaphoreCI pipelines to Actions                         |
| Can build entire pipelines or individual steps in a pipeline from first-party workflow and action templates | Can only view pipeline runs per repo (maybe overview of runs across org repos exists?) |
| GH CLI to programmatically interact with the tool                                                           | Reviews show Actions pipelines can run noticeably slower than SemaphoreCI              |
| Secrets management can be done on a per repo basis                                                          |                                                                                        |
| Breakdown view of logs from individual pipeline steps                                                       |                                                                                        |

[**Actions**](https://github.com/features/actions) is another managed CI/CD service we considered that is integrated directly into GitHub. It's very similar to SemaphoreCI in terms of the services offered and runs on Microsoft/GitHub infrastructure. The web UI is more lacking than the SemaphoreCI web UI in my opinion. But it has a much better templating system for common pipelines and individual steps in pipelines.

![Github Actions](https://files.imranc.io/static/blog/posts/improving-ci-cd/github-actions.png)

The web UI suggests relevant templates for your repo based on the files found in your source code. You can usually Google and find complete workflows that do common CI/CD tasks for your particular tech stack and all you have to do is plug in any needed secrets for the pipelines on a per repo basis. Or you can reference action templates to let you do common steps in pipelines and build your own pipelines around those steps.

For example, there are action templates for logging into various docker container registries, including [Dockerhub](https://hub.docker.com/), [AWS ECR](https://aws.amazon.com/ecr/), or [GHCR](https://ghcr.io/). In your pipeline, you can swap between any of these providers, depending on your needs, by simply referencing a different action template and providing needed secrets in your repo. You may find these action templates are written by the Docker developer community or cloud providers so you can assume the steps will always work with those services as they intended. Similarly, there are pipeline templates for logging into a docker container registry, building and tagging your docker image for your project, and pushing to your container registry of choice. The developer experience is really great with a library of useful and reliable templates that can be used for common CI/CD tasks and/or pipelines.

# Platform Chosen - SemaphoreCI

Our choice mainly came down to SemaphoreCI being the platform most familiar by the engineer pushing for a paid CI service when we bought it. Actions was gaining popularity, but it did not have such a rich ecosystem of templates/plugins initially. Meanwhile Semaphore was already on version 2.0 with a host of improvements over its initial release. And they were advertising [2x faster builds](https://semaphoreci.com/resources/semaphore-vs-github-actions) and had done detailed benchmarks to prove their CI service is more performant. Semaphore also offers more configuration options for the machines running CI pipelines.

As a rule of thumb, I think any software being consumed by end users or other developers should go through a continuous integration/delivery process that is transparent, informative and efficient. For the rest of this document, I will describe CI/CD as it's done for the Fabric V2 web product. This limits the discussion to a mostly TypeScript/JavaScript based full-stack web application and CI/CD pipelines for that application that have been refined over time.

# Fabric V2

## Development

### GitHub repositories

The 2 main GitHub repos for fabric v2 web app are [**`fabric-api-ts`**](https://github.com/abyss-solutions/fabric-api-ts) (backend) and [**`fabric-client-react`**](https://github.com/abyss-solutions/fabric-client-react) (frontend). SemaphoreCI pipelines have been set up for both repos. It's important to note that we use GitHub for source control only. We do not store any build/deploy artefacts or environment secrets or static assets (usually) in source control.

> Great care must be taken by developers/architects to ensure good [separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns) on a GitHub repository level as this is the base level by which you can separate CI/CD pipelines
>
> By leveraging [monorepos](https://semaphoreci.com/blog/what-is-monorepo), we can develop more complex CI/CD pipelines with dependencies on multiple GitHub repositories/projects

For CI, test suites are run to ensure the applications are behaving correctly and any tested features are working. If tests fail, the CD steps ([promotions](https://docs.semaphoreci.com/essentials/deploying-with-promotions/) in SemaphoreCI) will never run. It's on the developer to ensure their code is being tested properly and passing the required tests in order to ensure a clean deployment/delivery cycle.

CD is handled differently depending on the type of application. For example, we may want to deploy a static website to a fixed domain so it may be accessible by end-users, or we may want to publish a TypeScript/JavaScript package in a private package repo so it may be consumed by other developers/projects at Abyss, or we may want to deploy a containerised API to a container orchestration service and have it be accessible on a fixed domain, or we may want to deploy serverless cloud functions to a specific region so that it's accessible by other services through fixed domain, etc.

### Feature branches

![Feature branch](https://files.imranc.io/static/blog/posts/improving-ci-cd/feature-branch.svg)

We initially used a [feature branch workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow) for both these repos. In this workflow, any time we want to introduce a new feature into the application, we make a feature branch off the _`main`_ branch, push commits into our feature branch until we're satisfied, then we merge the feature branch back into the `main` branch using a GitHub pull request (PR). This is a relatively simple Git workflow and allows us to run our CI pipelines on every pushed commit and CD pipelines whenever anything is merged to the `main` branch automatically.

During the code review process in GitHub, certain repo settings will also prevent any code that is failing CI tests from being merged to the `main` branch or pushing commits directly to the `main` branch. Both `fabric-api-ts` and `fabric-client-react` repos are set up like this. This ensures that any code being merged into the `main` branch is fully tested/reviewed before it is deployed and delivered to end-users.

### GitFlow workflow

Recently, we started using another Git branching workflow, which is a variant of Atlassian's [GitFlow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow#:~:text=Gitflow%20is%20a%20legacy%20Git,software%20development%20and%20DevOps%20practices.). In this workflow, instead of tracking the _`main`_ branch only, we track another branch off `main`, called _`develop`_:

![Gitflow branches](https://files.imranc.io/static/blog/posts/improving-ci-cd/gitflow-branches.svg)

Developers will push latest features to the _`develop`_ branch using the feature branch workflow described above. Whenever a new feature is merged to `develop`, we can run CD pipelines as before, but specifically for the _pre-production_ (or staging or dev) [deploy environments](https://en.wikipedia.org/wiki/Deployment_environment). These environments will always stay up-to-date with the latest version of the application.

![Gitflow features](https://files.imranc.io/static/blog/posts/improving-ci-cd/gitflow-features.svg)

Once developers are happy with the stability of the pre-production deploy environments, they can periodically merge `develop` branch into _`main`_. Whenever `develop` is merged to `main`, we can run CD pipelines for the _production_ deploy environments. These environments will always stay up-to-date with the latest _stable_ version of the application.

The idea is we can have end-users doing uninterrupted work in stable production environments and simultaneously have developers push latest features to pre-production environments to be stress tested, before releasing them to end-users, all done automatically via GitHub PRs.

For any bugs found in production environments, we can branch off `main`, fix the bug and merge back into `main` and `develop` branches to deliver the fix to both production and pre-production environments.

> **Update Aug 20, 2022:** We have since switched back to a [trunk-based development](https://www.atlassian.com/continuous-delivery/continuous-integration/trunk-based-development) workflow. It’s much more simpler to maintain and similar concept as feature branches and enables CI/CD automation.
>
> Always branch off main and merge back to main. Rely on automated testing and feature flags to ensure main branch is always stable. Separate infrastructure for dev and prod environments. Merge/push on main branch triggers CD pipelines after CI steps pass.

### Conventional commits and automating Versioning/Releases

For all our Git commits during the development cycle, we use the [conventional commit message syntax](https://www.conventionalcommits.org/en/v1.0.0/). This is a way to structure your commit messages to be more meaningful. It also enables using tools that can read these commit messages and automatically version and release your applications in GitHub depending on how you structured your commit messages.

For Fabric V2, we started on alpha (pre-release) builds with incrementing version numbers for every new feature/fix added. But before release to production, we moved to a proper [semantic versioning](https://semver.org/) release cycle that is traditional for TypeScript/JavaScript projects by re-configuring the tool we use to version and release our packages (called [semantic-release](https://semantic-release.gitbook.io/semantic-release/)). This tool also generates and updates changelogs for us so we have traceability on what work was done for each release. It creates GitHub releases when merging code to configured branches. It also publishes package bundles to npm/yarn package repositories. There are similar tools available for different programming languages and package repositories (like [python-semantic-release](https://python-semantic-release.readthedocs.io/en/latest/) for python). These types of tools can run from SemaphoreCI during a _release_ step, for example.

## Frontend components

The frontend for Fabric V2 consists of a [React](https://reactjs.org/) application (`fabric-client-react`), built on top of the [Next.js](https://nextjs.org/) framework, various underlying React components the client app uses, and [Apollo Client](https://www.apollographql.com/docs/react/). `fabric-client-react` has a dependency on [**`abyss-3d-viewer`**](https://github.com/abyss-solutions/abyss-3d-viewer), which is a separate frontend React component/project. The 3d viewer has its own development/release cycle and it plugs into the client web application for Fabric V2.

The developers for the 3d viewer project follow the same development practices described above and that project has an automated build/release cycle whenever new features are pushed to the `main` branch. The CD steps for the 3d viewer ensure that the latest 3d viewer component is published to a private node.js package registry called [GemFury](https://gemfury.com/). GemFury also supports hosting private packages for python, ruby, etc. This package can then easily be consumed in the `fabric-client-react` project by configuring your node.js package manager, like npm or yarn, and referencing the package namespace `@abyss/3d-viewer` and version in the project's pacakge.json file. The node.js API bundle for Fabric V2, including some helper CLI scripts, are also published to GemFury under the namespace `@abyss/fabric-api`.

## Backend components

The main backend components for Fabric V2 are the [GraphQL](https://graphql.org/) API (`fabric-api-ts`), built on top of [Nest.js](https://nestjs.com/) framework, [Apollo Server](https://www.apollographql.com/docs/apollo-server/) and [MongoDB](https://www.mongodb.com/cloud/atlas/lp/try2?utm_source=google&utm_campaign=gs_apac_australia_search_core_brand_atlas_desktop&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624341&adgroup=115749705743&gclid=CjwKCAjwlqOXBhBqEiwA-hhitAzsxqgE81YjdDAk7JNX2EAMjsjJYj26k-VrFoWryrmlE-CrdRLUPBoCbXwQAvD_BwE). The API is stateless and doesn't require any persistent storage and MongoDB holds all persistent data. MongoDB requires databases and access control to be set up so that a user may read/write the data stored in its databases.

There are also secondary backend components needed to make the Fabric V2 service work. These include an identity provider, Auth0, so that users can log into the frontend application and securely talk to the backend components using [JWT access tokens](https://jwt.io/introduction). They also include some serverless cloud functions that run compute tasks on demand in the cloud. Also a content delivery network (CDN) is used to deliver static content to end-users around the world. And a [Redis message broker](https://redis.com/solutions/use-cases/messaging/#:~:text=Redis%20Streams%20doubles%20as%20a,live%20notifications%20within%20a%20system.) is used for [GraphQL subscriptions](https://www.apollographql.com/docs/react/data/subscriptions/) functionality.

## Containerisation

_Containerisation_ is a way to package software into standardised units for development, shipment and deployment. It is a form of OS virtualization that leverages the features of the host operating system to isolate processes and control their access to memory, disk space, and CPUs. It allows us to deploy multiple applications using the same operating system on a single virtual machine or server.

In contrast, traditional _virtualisation_ (VMs) allows running multiple operating systems on the hardware of a single physical server.

### Docker

The Fabric V2 GraphQL API is containerised with [Docker](https://www.docker.com/). Essentially, there is a _Dockerfile_ for the API, which is like a blueprint for all the things needed for the API to function and how to build/run the API (based off other standardised units). The Docker _image_ built from this blueprint can be pushed to a container registry, like [AWS ECR](https://aws.amazon.com/ecr/). The images can be _tagged_ under a variety of versions according to our release/deploy cycles and CI/CD pipelines. You can then run instances of the images in Docker _containers_ in a variety of different hardware/OS configurations.

> The main difference between Docker and VM is that Docker provides container virtualisation while VM provides hardware-level virtualisation.

## Container Orchestration

Once Docker images for your containerised services are being tagged/pushed to a container registry during your CI cycle, you can plug in a container orchestration platform, like [Kubernetes](https://kubernetes.io/), to manage running instances of your Docker images for your CD cycle. A kubernetes _cluster_ typically consists of multiple _pods_, which run instances of one or more containerised _services_. These pods and services can all talk to each other securely. There may be a load balancer in front of them that redirects all incoming requests to individual pods/services. We can easily [scale horizontally](https://www.cloudzero.com/blog/horizontal-vs-vertical-scaling#horizontal-scaling) by automatically adding more running instances of containerised services to handle more incoming requests as needed.

### EKS

[AWS EKS](https://aws.amazon.com/eks/) is Amazon's managed kubernetes service. It lets you manage kubernetes applications on AWS infrastructure, using [EC2](https://aws.amazon.com/ec2/) or [Fargate](https://aws.amazon.com/fargate/). It provides full control over all the components of your service architecture and how you scale and deploy them.

### ECS

[AWS ECS](https://aws.amazon.com/ecs/) is Amazon's managed container orchestration service. It requires less configuration than EKS and also provides less control over individual components. You can deploy containerised applications easily for simple setups.

We're currently using EKS to manage running instances of our containerised APIs for Fabric V2 as it provides more control over exactly how we scale API deployments in future. Note that Kubernetes has a higher barrier of entry due to additional knowledge required around kubernetes clusters and pods.

## Infrastructure as Code

One of the more tedious and repetitive tasks involved with maintaining CI/CD pipelines is managing the infrastructure needed for the delivery of your applications. This includes provisioning infrastructure resources for new deployments and destroying infrastructure resources for old deployments as needed.

When starting to make your application production-ready, all this can be done manually with the help of an experienced IT/DevOps professional. They may use some CLI commands, or interact with some web UI dashboards for these tasks. However, over time as requirements for more deployments and deliveries build up, this manual process can become infeasible very quickly. Developers will always need the help of an IT/DevOps professional to provision new infrastructure or destroy old infrastructure for software delivery operations, even if using a CI service to automate tasks. It can get difficult to track/maintain all the different infrastructure resources being used for different software delivery pipelines.

### Terraform

This is where something like Terraform can come in. [Terraform](https://www.terraform.io/) is an open-source infrastructure as code software tool that enables you to safely and predictably create, change, and improve infrastructure. It is extendable by design and plugs into many different service providers, like AWS, MongoDB Atlas, Auth0, etc.

Lets say for a full-stack delivery of a Fabric V2 web app, I need Auth0 resources for authentication ([IDaaS](https://www.okta.com/au/identity-101/idaas/)), MongoDB Atlas resources for data persistence ([DBaaS](https://www.mongodb.com/database-as-a-service)), AWS S3/CloudFront resources for content storage/delivery, AWS Lambda resources for serverless compute functions ([FaaS](https://www.digitalocean.com/blog/what-is-faas-function-as-a-service-explained)), and (AWS EKS) Kubernetes resources for containerised backend services ([CaaS](https://www.atlassian.com/microservices/cloud-computing/containers-as-a-service)). And all these resources need to be configured a certain way for my full-stack web application to work as intended.

Then, an experienced IT/DevOps professional could write terraform scripts (and store in source control like GitHub) to declaratively define the exact infrastructure/cloud resource requirements for the delivery of my full-stack web application as code. Terraform can look at the resource requirements, compare with the current state, and apply changes as required to create or destroy those resources as needed for software delivery pipelines.

### Serverless

![Serverless dashboard](https://files.imranc.io/static/blog/posts/improving-ci-cd/serverless.png)

The [serverless framework](https://www.serverless.com/) (and [serverless components](https://github.com/serverless/components)) is another tool that can be used to automate and abstract away complexities of application deployments. It has a rich plugin ecosystem that lets developers rapidly deploy serverless apps for popular tech stacks without needing to be a cloud expert. The serverless framework can let you build your serverless functions in a cloud-agnostic way, such that it works with AWS Lambda or Google Cloud Functions or Azure Functions. It does not provide the same granular control over infrastructure resources as Terraform does, but can be more developer friendly.

For example, there is a [serverless next.js plugin](https://www.serverless.com/plugins/serverless-nextjs-plugin) that can deploy Next.js-based React apps to AWS [CloudFront](https://aws.amazon.com/cloudfront/)/[Lambda@Edge](https://aws.amazon.com/lambda/edge/). So any static resources for the frontend application (html, css, js) can be delivered via CDN to many different regions around the world. And edge functions are deployed around the world to handle any server-side rendering tasks for the frontend Next.js application. There is zero configuration required for this plugin, other than giving it required access to your AWS and telling it which AWS custom domain name to deploy your Next.js React app to.

> The term _serverless_ is the highest level of abstraction, where developers don't even think of servers (all that's taken care of behind the scenes; like [AWS lambda functions](https://aws.amazon.com/lambda/))
>
> And _infrastructure as code_ refers to declaratively defining your infrastructure requirements as code (Terraform, CloudFormation, etc.)

We get a lot of benefits by writing all our delivery infrastructure requirements as code. We can use simple CLI commands (with minimal configuration) to provision all infrastructure needed for new deployments or destroy infrastructure for old deployments. We can document these steps to be used by developers without needing continuous input or intervention from IT/DevOps professionals after initial setup. As requirements change, we can iterate on infrastructure code over time, just like we do with application code. The infrastructure code is self-documenting for IT/DevOps professionals who understand Terraform/Serverless resources/concepts/architecture defined in the scripts. The deployment(s) state is managed by Terraform/Serverless frameworks and can be persisted in SemaphoreCI cache files (or S3 buckets) if needed. Tech stacks for deployments are easily replicable and maintainable. Business continuity can be ensured even with under-resourced IT staff.

## Error reporting and performance monitoring

Once you have multiple deployments of your application that is being consumed by end-users, it's really valuable to monitor the status and performance of your deployed applications.

### Sentry.io

![Sentry.io error](https://files.imranc.io/static/blog/posts/improving-ci-cd/sentry-error.png)

We use [sentry.io](http://sentry.io/) to track the performance and status of deployed applications for Fabric web. Sentry has SDKs to plug into many different types of applications, like web apps, smartphone apps, desktop apps, etc. We use SemaphoreCI to integrate Sentry into our applications during the build/deploy process. Anytime a new version of an application is released and deployed, Sentry is notified.

<p align="center">
  <img src="https://files.imranc.io/static/blog/posts/improving-ci-cd/sentry-release.png" alt="Sentry.io release" />
</p>

All deployments are tagged under different environment names and versions. Sentry is able to show us stack trace for any exceptions or errors that occur during runtime/execution of our applications. It will try to suggest 'suspect commits' it thinks may have caused a regression in your application based on the error events. It will receive source maps for code so that debug logs show relevant source code (instead of transpiled or minified production code). For a sample of events/requests, Sentry will also monitor performance of your deployed applications.
