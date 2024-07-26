pipeline {
    agent any
    triggers {
        githubPush() // This will trigger the build on GitHub push events
    }
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
        stage('Start Backend') {
            steps {
                dir('infypos_backend') {
                    script {
                        // Check if PM2 process is already running
                        def processStatus = bat(script: 'pm2 list', returnStdout: true).trim()
                        if (processStatus.contains('pos_backend')) {
                            echo 'Process pos_backend is already running.'
                        } else {
                            // Start the backend with PM2
                            bat 'pm2 start npm --name "pos_backend" -- start'
                        }
                    }
                }
            }
        }
    }
}
