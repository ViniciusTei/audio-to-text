import speechToText from '../utils/speechToText'

export default async function Home() {

  async function upload(data: FormData) {
    'use server'
    const file: File | null = data.get('file') as File

    if (!file) {
      throw new Error('No file')
    }

    const text = await speechToText(file)
    console.log('text', text)

    return { success: true }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Next.js + Tailwind CSS</h1>

      <form action={upload} method="POST" encType="multipart/form-data">
        <input type="file" name="file" />
        <input type="submit" value="Upload" />
      </form>    

    </main>
  )
}
