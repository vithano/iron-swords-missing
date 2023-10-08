import {ImageResponse} from 'next/server';
// App router includes @vercel/og.
// No need to install it.

export const runtime = 'edge';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const image = await fetch(new URL('./logo.jpg', import.meta.url)).then(
        (res) => res.arrayBuffer(),
    );
    // ?title=<title>
    const hasTitle = searchParams.has('title');
    const title = hasTitle
        ? searchParams.get('title')?.slice(0, 100)
        : 'Iron Source - Missing victims of terror';


    return new ImageResponse(
        (
            <div
                style={{
                    display: 'flex',
                    background: '#fefff1',
                    width: '100%',
                    height: '100%',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <img width="256" height="256" src={image as unknown as string} alt="logo"/>
                <div
                    style={{
                        fontSize: 40,
                        fontStyle: 'normal',
                        letterSpacing: '-0.025em',
                        color: 'black',
                        marginTop: 30,
                        padding: '0 120px',
                        lineHeight: 1.4,
                        whiteSpace: 'pre-wrap',
                    }}
                >
                    {title}
                </div>

            </div>
        ),
        {
            width: 1200,
            height: 630,
        },
    );
}