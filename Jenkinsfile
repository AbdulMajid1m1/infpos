pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies - Backend') {
            steps {
                dir('infypos_backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Start Backend') {
            steps {
                dir('infypos_backend') {
                    // Stop the specific backend process if it's running
                    sh '''
                        if pm2 list | grep -q "backend"; then
                            pm2 stop backend
                            pm2 delete backend
                        fi
                    '''
                    // Start the backend process
                    sh 'pm2 start npm --name "backend" -- start'
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
