pipeline {
    agent any
    stages {
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
                    bat 'start npm start'
                }
            }
        }
    }
}
