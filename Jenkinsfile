pipeline {
    environment {
    imagename = "web"
    dockerImage = ''
    jenkinsProject = 'frontend'
  }

    agent any
    stages {
    stage('gitlab') {

          steps {
             echo 'Notify GitLab'
             updateGitlabCommitStatus name: 'build', state: 'pending'
             updateGitlabCommitStatus name: 'build', state: 'success'
          }

       }

        stage('Git Staging'){

            steps{

                checkout([$class: 'GitSCM', branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: 'Admin-Gitlab', url: 'https://github.com/yashrpandit/calculator-webapp.git']]])

            }
        }


     stage('Building image | Upload to Docker Hub ') {

      steps{
      sh 'sudo su - jenkins -s/bin/bash'
      sh 'cd  /var/lib/jenkins/workspace/$jenkinsProject/'
      sh 'docker image build -t  $imagename .'

   }

    }  

    stage('Pulling Image from Docker') {

        steps {
            //sh 'sudo docker stop $imagename'
            //sh 'sudo docker rm $imagename'
            sh 'sudo docker run -p81:8000 --restart=always --name $imagename  -itd $imagename'
        }

    }


    // stage('Configure Nginx') {

    //     steps {
    //         sh 'ls'
    //         sh 'sudo cp bok.conf /etc/nginx/sites-enabled/'
    //         sh 'sudo nginx -t'
    //         sh 'sudo systemctl reload nginx'
    //     }
    // }
    }
}

