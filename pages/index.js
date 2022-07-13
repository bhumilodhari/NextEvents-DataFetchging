import Head from 'next/head'

import { getFeaturedEvents } from '../helpers/api-util';
import React, { Fragment } from 'react'
import EventList from '../components/events/EventList'
// import EventsSearch from '../components/events/events-search';


function HomePage(props) {
    return (
        <Fragment>
            <Head>
                <title>NextJS Events</title>
                <meta name="description" content="Find a lot of great events that allow you to evolve..." />
            </Head>
            <EventList items={props.events} />
        </Fragment>
    )
}

export async function getStaticProps() {
    const featuredEvents = await getFeaturedEvents();
    return {
        props: {
            events: featuredEvents
        },
        revalidate: 30
    }
}

export default HomePage