import imagePath from './imagePath'


export default [
    {
        // url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Load media from the network
        title: 'Ekta Masjid Banaia De',
        artist: 'deadmau',
        id: 1,
        // url: 'file:///storage/emulated/0/Gajol/ektaMasjidBanaiaDe.MP3',
        url: require('../assets/songs/ektaMasjidBanaiaDe.mp3'),
        artwork: require('../assets/images/banner.png'), // Load artwork from the network
        // duration: 402 // Duration in seconds 
    },
    {
        // url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Load media from the network
        title: 'বেহেশতী সাওগাত',
        artist: 'deadmau2',
        id: 2,
        // url: 'file:///storage/emulated/0/Gajol/Behesty.MP3',
        url: imagePath.behesty,
        artwork: require('../assets/images/banner.png'), // Load artwork from the network
        // duration: 402 // Duration in seconds 
    },
    {
        // url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',// Load media from the network
        title: 'কবর_নামের_বাড়ী',
        artist: 'deadmau3',
        id: 3,
        // url: 'file:///storage/emulated/0/Gajol/koborNaameBari.MP3',
        url: require('../assets/songs/koborNaameBari.mp3'),
        artwork: require('../assets/images/banner.png'), // Load artwork from the network
        // duration: 402 // Duration in seconds 
    },
    {
        // url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Load media from the network
        title: 'Bru_Pluck_Facial',
        artist: 'deadmau4',
        id: 4,
        // url: 'file:///storage/emulated/0/Gajol/bruPluckFacial.MP3',
        url: require('../assets/songs/bruPluckFacial.mp3'),
        artwork: require('../assets/images/banner.png'), // Load artwork from the network
        // duration: 402 // Duration in seconds 
    },
    {
        // url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Load media from the network
        title: 'এলো কে কাবার ধারে',
        artist: 'deadmau5',
        id: 5,
        url: require('../assets/songs/eloKeKabar.mp3'),
        artwork: require('../assets/images/banner.png'), // Load artwork from the network
        // duration: 402 // Duration in seconds 
    }
]