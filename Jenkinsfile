podTemplate(label: 'buildHmdaHelp', containers: [
  containerTemplate(name: 'docker', image: 'docker', ttyEnabled: true, command: 'cat'),
  containerTemplate(name: 'helm', image: 'lachlanevenson/k8s-helm', ttyEnabled: true, command: 'cat')
],
volumes: [
  hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
]) {
   node('buildHmdaHelp') {
     def repo = checkout scm
     def gitCommit = repo.GIT_COMMIT
     def gitBranch = repo.GIT_BRANCH
     def shortGitCommit = "${gitCommit[0..10]}"

    stage('Build And Publish Docker Image') {
      container('docker') {
        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'dockerhub',
            usernameVariable: 'DOCKER_HUB_USER', passwordVariable: 'DOCKER_HUB_PASSWORD']]) {
              sh "docker build --rm -t=${env.DOCKER_HUB_USER}/hmda-help ."
              sh "docker tag ${env.DOCKER_HUB_USER}/hmda-help ${env.DOCKER_HUB_USER}/hmda-help:${gitBranch}"
              sh "docker login -u ${env.DOCKER_HUB_USER} -p ${env.DOCKER_HUB_PASSWORD} "
              sh "docker push ${env.DOCKER_HUB_USER}/hmda-help:${gitBranch}"
            }
        }
      }

    stage('Deploy') {
      when {
        expression { return gitBranch == 'master' }
      }
      container('helm') {
        sh "helm upgrade --install --force --namespace=default --values=kubernetes/hmda-help/values.yaml --set image.tag=${gitBranch} hmda-help kubernetes/hmda-help"
      }
    }

   }

}