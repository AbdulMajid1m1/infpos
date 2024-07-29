pipeline {
    agent any

    environment {
        NODE_ENV = "development"
    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/AbdulMajid1m1/infpos.git']])
            }
        }
        stage('Install Dependencies - Backend') {
            steps {
                dir('infypos_backend') {
                    bat 'npm install'
                }
            }
        }
        stage('Check NPM Configuration') {
            steps {
                bat 'type %USERPROFILE%\\.nvm\\v20.10.0\\NPM.CMD'
            }
        }
        stage('Start Backend') {
            steps {
                dir('infypos_backend') {
                    // Stop and delete the process if it exists
                    bat 'pm2 stop pos_backend || exit 0'
                    bat 'pm2 delete pos_backend || exit 0'
                    
                    // Start the backend with PM2
                    bat 'pm2 start npm --name "pos_backend" -- start'
                }
            }
        }
    }
}
