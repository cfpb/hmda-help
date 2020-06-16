pipeline {
  agent {
    label 'hmdaops'
  }

  stages {
    stage('init') {
      steps {
        script {
          init.setEnvironment('hmda_help')
        }
      }
    }

    stage('Build And Publish Docker Image') {
      steps {
        script {
          withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'dockerhub',
            usernameVariable: 'DOCKER_HUB_USER', passwordVariable: 'DOCKER_HUB_PASSWORD']]) {
            withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'dtr-ext-jenkins-service',
              usernameVariable: 'DTR_USER', passwordVariable: 'DTR_PASSWORD']]) {
                dockerBuild.dockerBuild('hmda-help', '.')
                scanImage('hmda/hmda-help', env.DOCKER_TAG)
              }
            }
          }
        }
      }

     stage('Deploy') {
      agent {
        docker {
          image 'hmda/helm:2.16.6'
          reuseNode true
          args '--entrypoint=\'\''
        }
      }
      steps {
        script {
          withCredentials([file(credentialsId: 'hmda-ops-kubeconfig', variable: 'KUBECONFIG')]) {
            if (env.DOCKER_PUSH == 'true') {
              helm.deploy('hmda-help', 'values.yaml')
            }
          }
        }
      }
    }

  }

}
