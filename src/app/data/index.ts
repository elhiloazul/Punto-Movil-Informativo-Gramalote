import { Activity } from "../models/activity.model";


export const ACTIVITIES: Activity[] = [
    {
        id: 'modulo-1',
        title: 'Conoce nuestro proyecto',
        slides: [
            {
                id: 'slide-1',
                type:'text',
                text: '¡Perfecto! bienvenido a conocer un poco de la historia de Gramalote.',
                audio: 'audio/actividades/modulo-1/slide-3.mp3'
            },
            {
                id: 'slide-2',
                type: 'text',
                text: '¿Sabes que es una licencia ambiental?',
                audio: 'audio/actividades/modulo-1/slide-3.mp3'
            },
            {
                id: 'slide-3',
                type: 'image',
                imageUrl: 'images/actividades/modulo-1/slide-3.png',
                text: `Ubicado en Antioquia en el corregimiento Providencia, de <span class='highlight'>San Roque; hace 20 años se estudió el lugar para desarrollar un proyecto minero.</span>`,
                audio: 'audio/actividades/modulo-1/slide-3.mp3'
            },
            {
                id: 'slide-4',
                type: 'text',
                text: 'la calidad del oro e impacto ambiental en el área del territorio de San Roque y Yolombó donde se adelantaron estudios acerca de la mejor forma de construir y operar el proyecto, que diera beneficios a la región. (2022 – 2025)',
                audio: 'audio/actividades/modulo-1/slide-3.mp3'
            },
            {
                id: 'slide-5',
                type: 'image',
                imageUrl: 'assets/images/actividad1/modulo1-slide5.png',
                text: 'dando como resultado, una mina moderna con una vida útil de 13 años,',
                audio: 'audio/actividades/modulo-1/slide-3.mp3'
            },
            {
                id: 'slide-6',
                type: 'image',
                imageUrl: 'assets/images/actividad1/modulo1-slide6.png',
                text: 'la cual posee licencia ambiental desde el 2015, pero debes tener presente que en este momento el proyecto Gramalote, está modificando su licencia ambiental; si quieres saber por qué, ¡explora un poco más!',
                audio: 'audio/actividades/modulo-1/slide-3.mp3'
            },
            {
                id: 'slide-7',
                type: 'image',
                imageUrl: 'assets/images/actividad1/modulo1-slide7.png',
                text: 'Mientras se realiza este proceso, se trabaja de la mano con la comunidad contribuyendo en su desarrollo en salud, seguridad, productividad, y medio ambiente. Además, se adelantan procesos de reasentamiento y formalización minera',
                audio: 'audio/actividades/modulo-1/slide-3.mp3'
            },
            {
                id: 'slide-8',
                type: 'video',
                videoUrl: 'https://www.youtube.com/watch?v=cR8T-S8zfNw',
                text: 'Para conocer un poco más de esto, acompáñame a ver "presente y futuro" un video que nos muestra los aportes que el proyecto ha realizado a la comunidad',
                audio: 'audio/actividades/modulo-1/slide-3.mp3'
            },
            {
                id: 'slide-9',
                type: 'video',
                videoUrl: 'assets/videos/actividad1/modulo1-slide9.mp4',
                text: 'Por cierto... Sabes cómo funciona la minería? Ven y averigüémoslo juntos con este video',
                audio: 'audio/actividades/modulo-1/slide-3.mp3'
            }
        ],
    },
    {
        id: 'modulo-2',
        title: 'Nuestra licencia ambienta',
        slides: [
            {
                id: 'slide-1',
                type:'document',
                documentUrl: 'documents/actividades/modulo-2/slide1.pdf',
                audio: 'audio/actividades/modulo-1/slide-3.mp3'
            },
        ]
    },
    {
        id: 'modulo-3',
        title: 'Conoce el MEIA',
        slides: []
    },
    {
        id: 'modulo-4',
        title: 'Tu cuentas SQR',
        slides: []
    }
    
]