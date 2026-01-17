import { SlideDescribeMineralsGameComponent } from "../components/slide-custom-component/games/slide-describe-minerals-game/slide-describe-minerals-game.component";
import { SlideSarchingMineralsGameComponent } from "../components/slide-custom-component/games/slide-sarching-minerals-game/slide-sarching-minerals-game.component";
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
                audio: 'audio/actividades/modulo-1/slide-1.mp3'
            },
            {
                id: 'slide-2',
                type: 'text',
                text: '¿Sabes que es una licencia ambiental?',
                audio: 'audio/actividades/modulo-1/slide-2.mp3'
            },
            {
                id: 'slide-3',
                type: 'image',
                imageUrl: 'images/actividades/modulo-1/slide-3.png',
                text: `Ubicado en Antioquia en el corregimiento Providencia, de <span class='highlight'>San Roque; hace 20 años se estudió el lugar para desarrollar un proyecto minero.</span>`,
                audio: 'audio/actividades/modulo-1/slide-X.mp3'
            },
            {
                id: 'slide-4',
                type: 'text',
                text: 'la calidad del oro e impacto ambiental en el área del territorio de San Roque y Yolombó donde se adelantaron estudios acerca de la mejor forma de construir y operar el proyecto, que diera beneficios a la región. (2022 – 2025)',
                audio: 'audio/actividades/modulo-1/slide-X.mp3'
            },
            {
                id: 'slide-5',
                type: 'image',
                imageUrl: 'images/actividades/modulo-1/slide-5.png',
                text: 'dando como resultado, una mina moderna con una vida útil de 13 años,',
                audio: 'audio/actividades/modulo-1/slide-X.mp3'
            },
            {
                id: 'slide-6',
                type: 'image',
                imageUrl: 'images/actividades/modulo-1/slide-6.png',
                text: 'la cual posee licencia ambiental desde el 2015, pero debes tener presente que en este momento el proyecto Gramalote, está modificando su licencia ambiental; si quieres saber por qué, ¡explora un poco más!',
                audio: 'audio/actividades/modulo-1/slide-X.mp3'
            },
            {
                id: 'slide-7',
                type: 'image',
                imageUrl: 'images/actividades/modulo-1/slide-7.png',
                text: 'Mientras se realiza este proceso, se trabaja de la mano con la comunidad contribuyendo en su desarrollo en salud, seguridad, productividad, y medio ambiente. Además, se adelantan procesos de reasentamiento y formalización minera',
                audio: 'audio/actividades/modulo-1/slide-7.mp3'
            },
            {
                id: 'slide-8',
                type: 'video',
                videoUrl: 'https://www.youtube.com/watch?v=cR8T-S8zfNw',
                text: 'Para conocer un poco más de esto, acompáñame a ver "presente y futuro" un video que nos muestra los aportes que el proyecto ha realizado a la comunidad',
                audio: 'audio/actividades/modulo-1/slide-8.mp3'
            },
            {
                id: 'slide-9',
                type: 'video',
                videoUrl: 'https://www.youtube.com/watch?v=cR8T-S8zfNw',
                text: 'Por cierto... Sabes cómo funciona la minería? Ven y averigüémoslo juntos con este video',
                audio: 'audio/actividades/modulo-1/slide-9.mp3'
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
                text: 'Es un permiso de la autoridad ambiental que nos permite hacer el proyecto minero.',
                audio: 'audio/actividades/modulo-2/slide-X.mp3'
            },
            {
                id: 'slide-2',
                type: 'text',
                text: 'Para lograrlo se debe demostrar que se estudiaron todos los posibles impactos ambientales y sociales.',
                audio: 'audio/actividades/modulo-2/slide-2.mp3'
            },
            {
                id: 'slide-3',
                type: 'image',
                imageUrl: 'images/actividades/modulo-2/8-aspectos.png',
                text: 'formulando así, las correspondientes acciones de compromiso ambiental, las cuales se denominan PM (plan de manejo ambiental)',
                audio: 'audio/actividades/modulo-2/slide-X.mp3'
            },
            {
                id: 'slide-4',
                type: 'image',
                imageUrl: 'images/actividades/modulo-2/8-aspectos.png',
                text: 'logrando disminuir estos efectos en la comunidad y el medio ambiente. Toda la documentación (estudios ambientales) respaldada con evidencias,se presenta antela ANLA',
                audio: 'audio/actividades/modulo-2/slide-X.mp3'
            },
            {
                id: 'slide-5',
                type: 'image',
                imageUrl: 'images/actividades/modulo-2/8-aspectos.png',
                text: 'El estudio ambiental es un documento técnico que debe cumplir con 8 aspectos (observa la imagen).',
                audio: 'audio/actividades/modulo-2/slide-5.mp3'
            },
            {
                id: 'slide-6',
                type: 'text',
                text: 'Quiero contarte que Gramalote tiene licencia desde el 2015, y ha sido modificada conforme avanza el proyecto.',
                audio: 'audio/actividades/modulo-2/slide-6.mp3'
            },
            {
                id: 'slide-7',
                type: 'text',
                text: 'respetando los compromisos ambientales y sociales, trabajando de forma transparente y cumpliendo con todas las normas.',
                audio: 'audio/actividades/modulo-2/slide-6.mp3'
            },
            {
                id: 'slide-8',
                type: 'text',
                text: 'Estamos modificando la licencia por qué se debe ajustar la ubicación de ciertas infraestructuras, para garantizar que el proyecto es seguro, sostenible, responsable  con la comunidad y el medio ambiente.',
                audio: 'audio/actividades/modulo-2/slide-8.mp3'
            }
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
    },
    {
        id: 'modulo-5',
        title: 'Juega y aprende',
        slides: [
            {
                id: 'slide-1',
                type:'text',
                text: '¡Hola! ¡Bienvenido a una de mis partes favoritas! ¡Los juegos! Tengo dos juegos muy divertidos para tí, acompañame a conocerlos.' ,
                audio: 'audio/actividades/modulo-5/slide-1.mp3'
            },
            {
                id: 'slide-2',
                type:'text',
                text: '1. Juguemos a ser geólogos',
                audio: 'audio/actividades/modulo-5/slide-2.mp3'
            },
            {
                id: 'slide-3',
                type:'image',
                imageUrl: 'images/actividades/modulo-5/slide-3.png',
                text: 'Nuesto grupo de geólogos llegó a una nueva zona, ayúdanos a encontrar que hay aquí.',
                audio: 'audio/actividades/modulo-5/slide-3.mp3'
            },
            {
                id: 'slide-4',
                type:'custom',
                component: SlideSarchingMineralsGameComponent
            },
            {
                id: 'slide-5',
                type:'custom',
                component: SlideDescribeMineralsGameComponent
            },
            {
                id: 'slide-6',
                type: 'text',
                text: "¿Te doy un dato sobre mí? !Me encantan las fotos! conservan recuerdos y nos permiten transmitir emociones a través de una imagen.",
                audio: 'audio/actividades/modulo-5/slide-6.mp3'
            }
        ]
    }
]