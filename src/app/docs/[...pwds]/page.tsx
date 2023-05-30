import { getMarkdownData } from '../../../lib/posts';

export default async function Page({ params }: {
  params: {
    pwds: string[]
  }
}) {
  const contentHtml = await getMarkdownData(params.pwds);
  return <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
}
