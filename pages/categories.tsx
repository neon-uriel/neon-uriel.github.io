import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import Date from '../components/Date';
import { getAllCategoryPaths, getSortedPostsData } from '../lib/posts';
import { InferGetStaticPropsType } from 'next';
import { get } from 'http';

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData,
        },
    };
}

function getAllCategories({ allPostsData }: InferGetStaticPropsType<typeof getStaticProps>) {
    let allCategories: string[] = [];
    allPostsData.forEach(({ categories }) => {
        categories.forEach((category) => {
            if (!allCategories.includes(category)) {
                allCategories.push(category);
            }
        });
    });
    return allCategories;
}

export default function Home({ allPostsData }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <Layout home>
            <Head>
                <title>Categories | {siteTitle}</title>
            </Head>
            {
                getAllCategories({ allPostsData }).map((category) => (
                    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`} key={category}>
                        <h2 className={utilStyles.headingLg}>#{category}</h2>
                        <ul className={utilStyles.list}>
                            {allPostsData.map(({ id, date, title, categories }) => (
                                categories.includes(category) ? (
                                    <li className={utilStyles.listItem} key={id}>
                                        <Link href={`/posts/${id}`}>{title}</Link>
                                        <br />
                                        <small className={utilStyles.lightText}>
                                            <Date dateString={date} />
                                        </small>
                                    </li>
                                ) : null
                            ))}
                        </ul>
                    </section>
                ))
            }
        </Layout >
    );
}

/* {{
                allPostsData.map(({ categories }) => (
                    categories.map((category) => (
                        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`} key={category}>
                            <h2 className={utilStyles.headingLg}>#{category}</h2>
                            <ul className={utilStyles.list}>
                                {allPostsData.map(({ id, date, title, categories }) => (
                                    categories.includes(category) ? (
                                        <li className={utilStyles.listItem} key={id}>
                                            <Link href={`/posts/${id}`}>{title}</Link>
                                            <br />
                                            <small className={utilStyles.lightText}>
                                                <Date dateString={date} />
                                            </small>
                                        </li>
                                    ) : null
                                ))}
                            </ul>
                        </section>
                    ))
                ))
            }} */