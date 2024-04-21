pipeline {
    environment {
    imagename = "web"
    jenkinsProject = 'frontend'
  }

    agent any
    stages {

        stage('Git Staging'){

            steps{

                checkout([$class: 'GitSCM', branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: 'github-cred', url: 'https://github.com/yashrpandit/calculator-webapp-frontend.git']]])

            }
        }


        stage('Build image and Run image ') {

            steps{
                sh 'sudo su - jenkins -s/bin/bash'
                sh 'sudo docker stop $imagename'
                sh 'sudo docker rm $imagename'
                sh 'sudo docker rmi $imagename'
                sh 'sudo docker image build -t  $imagename .'
                sh 'sudo docker run -p81:8000 --restart=always --name $imagename  -itd $imagename'

            }

        }
        
        stage('Configure Nginx') {
            steps {
            sh 'sudo cp new.conf /etc/nginx/sites-enabled/'
            sh 'sudo nginx -t'
            sh 'sudo systemctl reload nginx'
            }
        }

        
    }
}
