import React, { Fragment } from 'react'
import EventList from '../../components/events/EventList';
import EventsSearch from '../../components/events/events-search';
import { getAllEvents } from '../../helpers/api-util'
import { useRouter } from "next/router"
import Head from 'next/head'

function AllEventsPage(props) {
    const router = useRouter();
    const { events } = props;


    function findEventsHandler(year, month) {
        const fullPath = `/events/${year}/${month}`;
        return router.push(fullPath);
    }

    return (
        <Fragment>
            <Head>
                <title>Next Events</title>
                <meta name='description' content='NextJs Events' />
                <title>All Events</title>
                <meta name="description" content="Find a lot of great events that allow you to evolve..." />
            </Head>
            <EventsSearch onSearch={findEventsHandler} />
            <EventList items={events} />
        </Fragment>
    )
}

export async function getStaticProps() {
    const events = await getAllEvents();
    return {
        props: {
            events: events
        },
        revalidate: 60
    }
}

export default AllEventsPage