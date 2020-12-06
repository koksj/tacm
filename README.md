# TacmApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


# Work around for memoery error on angular openshift deployment
https://stackoverflow.com/questions/60927514/openshift-online-failing-to-build-angular-app-out-of-memory

# Deploy docker image to openshift
https://stackoverflow.com/questions/42163602/openshift-oc-new-app-image-versus-oc-new-app-docker-image
oc new-app --docker-image myid/myrepo:latest


https://cookbook.openshift.org/working-with-resource-objects/how-do-i-delete-all-resource-objects-for-an-application.html

https://stackoverflow.com/questions/54360223/openshift-nginx-permission-problem-nginx-emerg-mkdir-var-cache-nginx-cli


https://linuxize.com/post/how-to-remove-docker-images-containers-volumes-and-networks/#:~:text=To%20remove%20one%20or%20more,containers%20you%20want%20to%20remove.&text=If%20you%20get%20an%20error,the%20container%20before%20removing%20it.
## Docker
Removing all unused images #
To remove all images that are not referenced by any existing container, not just the dangling ones, use the prune command with the -a option:

docker image prune -a