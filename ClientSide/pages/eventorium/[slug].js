import React from 'react'
import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css'
import Link from 'next/link';
const rooms = {
    'meeting-room': {
        title: 'Meeting Room',
        images: [
            "https://wibes.co.in/auditoriums/meetingroom/meeting-room.webp",
            "https://wibes.co.in/auditoriums/meetingroom/board-meeting-room.webp",
            "https://wibes.co.in/auditoriums/meetingroom/cxo-meeting-room.webp",
            "https://wibes.co.in/auditoriums/meetingroom/premium-meeting-room.webp",
        ],
    },
    'auditorium': {
        title: 'Auditorium',
        images: [
            "https://wibes.co.in/auditoriums/auditorium/theater-mode-auditorium.webp",
            "https://wibes.co.in/auditoriums/auditorium/auditorium-hall.webp",
            "https://wibes.co.in/auditoriums/auditorium/auditorium-80-seatings.webp",
            "https://wibes.co.in/auditoriums/auditorium/auditorium.webp",
        ],
    },
    'conferemce-room': {
        title: 'Conference Room',
        images: [
            "https://wibes.co.in/auditoriums/conferenceroom/ordinary-conference-room.webp",
            "https://wibes.co.in/auditoriums/conferenceroom/premium-conference-room.webp",
            "https://wibes.co.in/auditoriums/conferenceroom/conference-room-for-15-20-people.webp",
            "https://wibes.co.in/auditoriums/conferenceroom/conference-room.webp",
        ],
    },
    'garden-event-area': {
        title: 'Garden Area Event',
        images: [
            "https://wibes.co.in/auditoriums/gardeneventarea/open-garden-event-area.webp",
            "https://wibes.co.in/auditoriums/gardeneventarea/seminar-open-garden-area.webp",
            "https://wibes.co.in/auditoriums/gardeneventarea/event-space-with-a-capacity-of-60-to-70-people.webp",
            "https://wibes.co.in/auditoriums/gardeneventarea/garden-event-area.webp",
        ],
    },
    'seminar-hall': {
        title: 'Seminar Hall',
        images: [
            "https://wibes.co.in/auditoriums/seminarhall/seminar-hall-capacity-range-of-300-340-participants.webp",
            "https://wibes.co.in/auditoriums/seminarhall/seminar-hall-300-340-people.webp",
            "https://wibes.co.in/auditoriums/seminarhall/small-seminar-hall.webp",
            "https://wibes.co.in/auditoriums/seminarhall/seminar-hall.webp",
        ],
    },
    'training-room': {
        title: 'Training Room',
        images: [
            "https://wibes.co.in/auditoriums/trainingroom/training-room-eating-capacity-of-up-to-100-seats.webp",
            "https://wibes.co.in/auditoriums/trainingroom/small-training-room.webp",
            "https://wibes.co.in/auditoriums/trainingroom/premium-training-room.webp",
            "https://wibes.co.in/auditoriums/trainingroom/training-room.webp",
        ],
    },
    'banquet-hall': {
        title: 'Banquet Hall',
        images: [
            "https://wibes.co.in/auditoriums/banquethall/premium-banquet-hall.webp",
            "https://wibes.co.in/auditoriums/banquethall/wibes-banquet-hall.webp",
            "https://wibes.co.in/auditoriums/banquethall/banquet-hall-for-100-people.webp",
            "https://wibes.co.in/auditoriums/banquethall/banquet-hall.webp",
        ],
    }

};
function Slug() {

    const router = useRouter();
    const { slug } = router.query;
    const roomData = rooms[slug];
    console.log(roomData)
    if (!slug || !roomData) {
        return <div>Loading...</div>;
      }
    return (
        <>
            <div className={styles.homeimage}>
                <div className={styles.imageText}>
                    <p>Eventorium</p>
                    <div>Best {roomData.title} in Surat</div>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.roomMenu}>
                    <ul>
                        {Object.keys(rooms).map((key) => (
                            <Link href={`/eventorium/${key}`} key={key} passHref>
                                <li className={key === slug ? styles.bold : ''}>
                                    {rooms[key].title.toUpperCase()}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
                <div className={styles.event}>
                    <div className={styles.imgCont}>
                        <div className={styles.imgContleft}>
                            {roomData.images.slice(0, -1).map((src, index) => (
                                <img key={index} src={src} alt={roomData.title} />
                            ))}
                        </div>
                        <div className={styles.imgContright}>
                            <img
                                src={roomData.images[roomData.images.length - 1]}
                                alt={roomData.title}
                            />
                        </div>
                    </div>
                    <div className={styles.description}>
                    <div className={styles.descLeft}>
                        <h2>{roomData.title.toUpperCase()}</h2>
                        <p>Can’t find a suitable Meeting Room in Surat? With premium amenities and 5 -14 seatings, we are the ideal choice for small and medium-sized gatherings. Brainstorm, strategize, and conquer your goals in this well-equipped space designed for focus and flow.</p>
                    </div>
                    <div className={styles.descRight}>
                        <button>Book Now</button>
                    </div>
                </div>
                </div>
                
            </div>
        </>
    );
}

export default Slug;
