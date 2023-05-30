import fs from 'fs'
import path from 'path'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'src/posts')

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const processedContent = await remark()
    .use(html)
    .process(fileContents)
  const contentHtml = processedContent.toString()
  // Combine the data with the id and contentHtml
  return contentHtml
}
