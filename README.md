# Introduction
This exercise took way longer than I initially anticipated. I haven't built an entire system from scratch in a long while and this proved to be an educative challenge.

### Why RabbitMQ?
For such a small use case, the difference in performance and usability between RabbitMQ, Redis, Apache Kafka, Blazing MQ etc. isn't really significant. On a larger scale, it falls down to the use case and what becomes a priority.

I went for RabbitMQ in this case because I am more familiar with it and because it is flexible when it comes to the number of queues/consumers.
### TDD?
Given the scope of the case, I decided to pass on setting up a testing environment. If the case was language agnostic, I would probably have done it via GoLang and proceeded towards a TDD approach as the environment is built-in with the language.

### Why no ORM?
I lack knowledge of node ORMs and wanted to reduce the scope of extra things to learn, so I went straight to .sql files instead... until I ran into a "compile" issue that refused to transfer the files, so I reverted to SQL strings.

# To run locally
Note that the following commands include customizable configurations, notably the database user & password. 
When changing any of these, make sure to also pass them to the order-queue image.

### Run the docker images for rabbitMQ and postgres
```shell
docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 -d rabbitmq:4-management-alpine
docker run --name postgres -p 5432:5432 -d -e POSTGRES_DB=orders -e POSTGRES_USER=dbUser -e POSTGRES_PASSWORD=12345 postgres:17-alpine 
```

### Build docker image for the order-queue
```shell
docker build . -t order-queue
```

### Run the docker image
```shell
docker run -p 3000:3000 -d -e DB_HOST=host.docker.internal -e RABBITMQ_URL=amqp://guest:guest@host.docker.internal:5672 order-queue
```

### Creating orders
You can now create orders via `localhost:3000/api/orders`. Any json object passed via the body will be recorded in the database.

### Notifications?
The notification Url can be changed by passing the NOTIFICATION_URL environment variable to the docker run command (use -e). 
The application will then attempt to send notifications of process completion to that URL.

# To run in a Kubernetes Cluster
The helm chart included with the project is ready for deployment. However, certain annotations may be required for deployment to specific Cloud solutions.

If needed, add the annotations required to the values.yaml file, when trying to install, helm will generally tell you which annotations are missing.

To install, run the following from the root of the repository:
```shell
helm install order-queue ./helm
```

### Creating orders
First fetch the ip of the application:
```shell
kubectl get svc
```
Look for the external IP.

You can now create orders via `<eternal-ip>:80/api/orders`. Any json object passed via the body will be recorded in the database.

### Notifications?
To pass a URL for the notifications to be sent to, change the value of `NOTIFICATION_URL` in values.yaml. A notification will be sent once an order has been processed.