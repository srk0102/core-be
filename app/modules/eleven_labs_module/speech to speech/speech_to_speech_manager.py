from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.responses import StreamingResponse
import requests
import os
from typing import Optional

app = FastAPI()

# Configuration
XI_API_KEY = os.getenv("XI_API_KEY", "sk_1f1f785d2dea5d9c7cc471445b129e63977c211f4e9561d9")
STS_API_URL = "https://api.elevenlabs.io/v1/speech-to-speech"

@app.post("/convert-audio/")
async def convert_audio(
    voice_id: str = Form(...),  # Voice ID as a form field
    model_id: Optional[str] = Form("eleven_english_sts_v2"),
    stability: Optional[float] = Form(0.5),
    similarity_boost: Optional[float] = Form(0.8),
    style: Optional[float] = Form(0.0),
    use_speaker_boost: Optional[bool] = Form(True),
    remove_background_noise: Optional[bool] = Form(False),
    audio_file: UploadFile = File(...)
):
    """
    Endpoint to convert an audio file using Eleven Labs' STS API.
    """
    headers = {
        "Accept": "application/json",
        "xi-api-key": XI_API_KEY,
    }
    
    voice_settings = {
        "stability": stability,
        "similarity_boost": similarity_boost,
        "style": style,
        "use_speaker_boost": use_speaker_boost,
    }

    data = {
        "model_id": model_id,
        "voice_settings": json.dumps(voice_settings),
    }

    files = {
        "audio": (audio_file.filename, await audio_file.read(), audio_file.content_type),
    }

    try:
        # Make the POST request to the STS API
        response = requests.post(
            f"{STS_API_URL}/{voice_id}/stream",
            headers=headers,
            data=data,
            files=files,
            stream=True
        )

        if not response.ok:
            raise HTTPException(status_code=response.status_code, detail=response.text)

        # Stream the response back to the client
        return StreamingResponse(
            response.iter_content(chunk_size=1024),
            media_type="audio/mpeg",
            headers={"Content-Disposition": "attachment; filename=converted_audio.mp3"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
