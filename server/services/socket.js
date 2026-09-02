//util/socket.js
import io from 'socket.io-client';

const socket = io('http://localhost:8080'); //server listener

export default socket;
