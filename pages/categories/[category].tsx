import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import Link from 'next/link';
import Date from '../../components/Date';
import { getSortedPostsData, getAllCategoryPaths } from '../../lib/posts';
import { InferGetStaticPropsType } from 'next';

export async function getStaticProps({ params }) {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData,
            category: params.category,
        },
    };
}

export async function getStaticPaths() {
    const paths = getAllCategoryPaths(); // You need to implement this function to get all category paths
    return {
        paths,
        fallback: false,
    };
}

export default function CategoryPosts({ allPostsData, category }: InferGetStaticPropsType<typeof getStaticProps> & { category: string }) {
    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
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
        </Layout>
    );
}