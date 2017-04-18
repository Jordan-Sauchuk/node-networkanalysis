var pcap = require("pcap"),
    pcap_session = pcap.createSession("", "tcp"),
    matcher = /safari/i;

console.log("Listening on " + pcap_session.device_name);

pcap_session.on('packet', function (raw_packet) {
    var packet = pcap.decode.packet(raw_packet),
        data = packet.link.ip.tcp.data;

    if (data && matcher.test(data.toString())) {
        console.log(pcap.print.packet(packet));
        console.log(data.toString());
    }
});



// If we integrate and build with node in the future we can easily route info to web browsers, databases and other neccessities 