import React, { Fragment } from 'react'
import { getEventById } from '../../helpers/api-util'
import { getFeaturedEvents } from '../../helpers/api-util';
import Head from 'next/head'
// import { useRouter } from 'next/router'
import EventSummary from '../../components/event-detail/event-summary'
import EventLogistics from '../../components/event-detail/event-logistics'
import EventContent from '../../components/event-detail/event-content'

function EventDetailPage(props) {
    // const router = useRouter();

    // const eventId = router.query.eventId;
    const event = props.selectedEvent;

    if (!event) {
        return <p>No event found!</p>
    }

    return (
        <Fragment>
            <Head>
                <title>{event.title}</title>
                <meta name={event.description} content="Find a lot of great events that allow you to evolve..." />
            </Head>
            <EventSummary title={event.title} />
            <EventLogistics
                date={event.date}
                address={event.location}
                image={event.image}
                imageAlt={event.title}
            />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </Fragment>
    )
}

export async function getStaticPaths() {
    const events = await getFeaturedEvents();
    const paths = events.map(event => ({ params: { eventId: event.id } }));
    return {
        paths: paths,
        fallback: true
    }
}
export async function getStaticProps(context) {
    const eventId = context.params.eventId;

    const event = await getEventById(eventId);

    return {
        props: {
            selectedEvent: event
        },
        revalidate: 30
    }
}


export default EventDetailPage