import { GenericContainer, StartedTestContainer } from 'testcontainers';

let container: StartedTestContainer;

export async function startMariaDBContainer(): Promise<StartedTestContainer> {
  container = await new GenericContainer('mariadb:latest')
    .withEnvironment({
      MYSQL_ROOT_PASSWORD: 'testpassword',
      MYSQL_DATABASE: 'test_lecture_db',
    })
    .withExposedPorts(3306)
    .start();

  process.env.DB_HOST = container.getHost();
  process.env.DB_PORT = container.getMappedPort(3306).toString();

  return container;
}

export async function stopMariaDBContainer(): Promise<void> {
  if (container) {
    await container.stop();
  }
}
