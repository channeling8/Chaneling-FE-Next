import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function TermsPage() {
    const filePath = path.join(process.cwd(), 'src/app/content/terms.md');
    const content = fs.readFileSync(filePath, 'utf-8');

    return (
        <main className="h-full overflow-y-auto bg-bg-0 px-6 py-10 [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="mx-auto max-w-[800px]">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h1: ({ ...props }) => <h1 className="mb-8 text-[24px] font-bold text-white" {...props} />,
                        h2: ({ ...props }) => (
                            <h2 className="mb-3 mt-8 font-title-20sb font-bold text-white" {...props} />
                        ),
                        p: ({ ...props }) => <p className="mb-4 font-body-16m leading-[1.6] text-white" {...props} />,
                        ol: ({ ...props }) => (
                            <ol className="mb-4 ml-6 list-decimal flex flex-col gap-y-1.5" {...props} />
                        ),
                        ul: ({ ...props }) => <ul className="mb-4 ml-6 list-disc flex flex-col gap-y-1.5" {...props} />,
                        li: ({ ...props }) => (
                            <li
                                className="font-body-16m leading-[1.5] text-white pl-1 marker:text-text-secondary"
                                {...props}
                            />
                        ),
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>
        </main>
    );
}
