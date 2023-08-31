import { useRouter } from "next/router";
import { server } from '../../config';
// router is required for fallback: true
const Post = ({job}) => {
    const router = useRouter();
    console.log(router);
    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Job page</h1>

        </div>
    );
};

export default Post;

export const getStaticProps = async ({ params }) => {
    const res = await fetch(`${server}/api/jobs/job/${params.link}`)
    console.log(params);
    const job = []; 
    return {
      props: { job }
    };
};

export const getStaticPaths = async () => {
    const res = await fetch(`${server}/api/jobs`)
    const json = await res.json();
    const jobs = json.slice(0,10);    
    const paths = jobs.map((job) => ({ params: { link: job.link.toString() } }));  
    return {
        paths,
        fallback: true,
    };
};