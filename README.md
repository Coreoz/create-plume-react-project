# Create Plume React Project

This command-line tool allows you to generate React projects with TypeScript, pre-configured with dependency injection and the observable pattern for a robust and scalable state management. It is based on the [Plume framework](https://github.com/Coreoz/Plume) philosophy.

## ⭐ Features

* **React with TypeScript:** Start your project with a solid foundation.
* **Dependency Injection:** Write modular and testable code.
* **Observable Pattern:** Manage your application's state in a predictable way.
* **Two templates available:** `front` and `admin` to fit your needs.
* **Ready for production:** Pre-configured with Sonar and GitLab CI.

## 🚀 Getting Started

To create a new project, run one of the following commands in your terminal:

### With Yarn (recommended)

`yarn dlx create-plume-react-project --template admin --projectName my-awesome-project`

### With NPX

`npx create-plume-react-project@latest --template admin --projectName my-awesome-project`

> **Note:** We recommend using `yarn dlx` as it is generally more reliable for executing package binaries.

Once the project is created, you can run it with:

1.  `yarn` to install the dependencies.
2.  `yarn start` to launch the development server.

## ⚙️ Options

You can customize the project generation by passing options to the command:

`npx create-plume-react-project@latest --[optionName] [value]`

| Option              | Default Value                               | Available Values        | Description                                                                                                    |
| ------------------- | ------------------------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------- |
| `template`          | `front`                                     | `front`, `admin`        | The template to use for your project.                                                                          |
| `projectName`       | `my-project`                                | Any string              | The name of your project. It will be used in `package.json` and `index.html`.                                  |
| `verbose`           | `false`                                     | `true`, `false`         | Set to `true` to display additional debug information during the project creation process.                       |
| `targetDirectory`   | Current directory                           | Any valid absolute path | The directory where the project will be initialized.                                                           |
| `templateDirectory` | The CLI's `build/templates` directory       | Any valid absolute path | A custom directory from which to load the templates.                                                           |

## 🛠️ Configuration

After creating your project, you may need to perform some additional configuration steps.

### SonarQube

To set up SonarQube analysis, edit the `sonar-project-frontend.properties` file with your project's information:

```properties
# Example
sonar.projectKey=my-project-front-ui
sonar.projectName=My Awesome Project - Front UI
````

### GitLab CI

A `.gitlab-ci.yml` file is included in the project with pre-configured jobs to build and analyze your application.

If you are using this frontend project within a [Plume backend project](https://github.com/Coreoz/Plume), you should:

1.  Copy the content of the frontend's `.gitlab-ci.yml` into the backend's GitLab CI file.

2.  In each job, add a `cd <frontend_directory>` command as the first step of the `script` section.

    ```yaml
    # Example
    Front UI build:
      # ...
      script:
        - cd my-awesome-project
      # ...
    ```

3.  Delete the frontend's `.gitlab-ci.yml` file.

## 💻 Development

If you want to contribute to this project, you can set up a development environment with the following steps:

1.  `yarn` to install the dependencies.
2.  `yarn build` to build the project.
3.  `npm link` to create a symbolic link to the package.

You can then open a new terminal and test your changes by running:

`npx create-plume-react-project@latest --template admin --projectName my-test-project`

> **Important:** Always use the `@latest` tag to ensure you are using the latest version of the CLI and not a cached one.

To apply your changes, you will need to run `yarn build` after each modification.

## 🗺️ Roadmap

Here are some ideas for future improvements:

  * **Interactive CLI:** Use a library like `enquirer` to ask for the options interactively.
  * **More template options:** Add modules for `i18n`, `material-ui`, `forms`, and `session management`.
  * **Improved terminal output:** Use a library like `chalk` to add colors to the terminal output.
  * **Automatic dependency installation:** Use `execa` or `pkg-install` to automatically install the dependencies after the project creation.

Contributions are welcome!