from app import create_app, socketio

app = create_app()
socketio.run(app,host='0.0.0.0')
# if __name__ == "__main__":
    #app.run(host='0.0.0.0')
