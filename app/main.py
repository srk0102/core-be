from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from elevenlabs.client import ElevenLabs
from io import BytesIO
from elevenlabs import play
from fastapi.responses import FileResponse
import os

app = FastAPI()
client = ElevenLabs(api_key="sk_1f1f785d2dea5d9c7cc471445b129e63977c211f4e9561d9")

@app.get("/generate-audio/")
def generate_audio(text: str):
    audio = client.generate(text=text, voice="Brian")
    
    # Use a BytesIO object to stream the audio
    audio_stream = BytesIO(audio)
    return StreamingResponse(audio_stream, media_type="audio/mpeg")


@app.get("/generate-audio-test/")
def generate_audio(text: str):
    audio = client.generate(text=text, voice="Brian")
    
    # Play the audio locally on the server
    play(audio)
    return {"message": "Audio played successfully on the server."}

@app.get("/generate-audio-test-file/")
def generate_audio_test_file(text: str):
    audio_generator = client.generate(text=text, voice="Brian")
    file_path = "output_audio.mp3"

    # Combine the chunks into a single bytes object
    audio_data = b"".join(audio_generator)  

    with open(file_path, "wb") as f:
        f.write(audio_data)
    
    return {"message": "Audio generated successfully.", "file_path": file_path}



@app.get("/download-audio/")
def download_audio():
    file_path = "output_audio.mp3"
    return FileResponse(file_path, media_type="audio/mpeg", filename="output_audio.mp3")
