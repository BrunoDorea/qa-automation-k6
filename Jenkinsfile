pipeline {
    agent any

    environment {
        SLACK_CHANNEL = 'jenkins-notifications'
        SLACK_TOKEN = 'slack-token'
    }

    stages {
        stage('Performance Testing') {
            steps {
                echo 'Installing k6'
                sh 'sudo chmod +x setup_k6.sh'
                sh 'sudo ./setup_k6.sh'
                echo 'Running K6 performance tests...'
                sh 'k6 run test/test.js'
            }
        }
    }

    post {
        always {
            echo 'Pipeline complete!'
        }
        success {
            slackSend color: "#6AA84F", channel: env.SLACK_CHANNEL, 
                      message: "✅ Os testes do sistema ${env.JOB_NAME} foram executados com sucesso! 🚀\nBuild: ${env.BUILD_NUMBER}\n🔗 Acesse: ${env.BUILD_URL}",
                      tokenCredentialId: env.SLACK_TOKEN
        }
        failure {
            slackSend color: "#D9534F", channel: env.SLACK_CHANNEL, 
                      message: "❌ Falha nos testes do sistema ${env.JOB_NAME}! ⚠️\nBuild: ${env.BUILD_NUMBER}\n🔗 Acesse: ${env.BUILD_URL} para mais detalhes.",
                      tokenCredentialId: env.SLACK_TOKEN
        }
    }
}