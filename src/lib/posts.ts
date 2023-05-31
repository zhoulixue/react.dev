import fs from 'fs'
import path from 'path'
import { remark } from 'remark'
import html from 'remark-html'
import gfm from 'remark-gfm'
import highlight from 'remark-highlight.js'

const postsDirectory = path.join(process.cwd(), 'src/docs')

export async function getMarkdownData(pwds: string[]) {
  const fullPath = path.join(postsDirectory, `${pwds.join('/')}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const processedContent = await remark()
    .use(gfm)
    .use(highlight)
    .use(html)
    .process(fileContents)
  const contentHtml = processedContent.toString()
  // Combine the data with the id and contentHtml
  return contentHtml
}
