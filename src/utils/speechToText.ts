
async function speechToText(audio: File) {
  const formData = new FormData();
  formData.append('file', audio);
  formData.append('model', 'whisper-1');

  try {
    const response = await fetch(
      'https://api.openai.com/v1/audio/transcriptions', 
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: formData
      }
    )

    const data = await response.json()
    return data
  } catch (error) {
    console.log('Error while fetching openai', error)  
    throw error
  }
}

export default speechToText
