pipeline {
    agent any
    stages {
        stage('Checkout Code') {
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
        stage('Manage Backend Process') {
            steps {
                script {
                    // Stop the backend process if it's running
                    bat 'pm2 stop pos_backend || exit 0'
                    // Delete the process from PM2 if it exists
                    bat 'pm2 delete pos_backend || exit 0'
                    // Start the backend with PM2
                    bat 'pm2 start npm --name "pos_backend" -- start'
                }
            }
        }
    }
}
