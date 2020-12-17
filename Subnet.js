
class Subnet {

    constructor(host, cidr, size) {
        this.host = host;
        this.cidr = cidr;
        this.size = size;

        this.range = new Array();
        for(let x=1; x<size-1; x++)
        {
            let ip = new Array();
            for(let i=0; i<4; i++)
            {
                ip[i] = host.ip[i];
            }
            ip[3] += x;
            ip[2] += ip[3] / 256;
            ip[3] %= 256;
            ip[1] += ip[2] / 256;
            ip[2] %= 256;
            this.range.push(new IPAddress(ip));
        }

        let ip = new Array();
        for(let i=0; i<4; i++)
        {
            ip[i] = host.ip[i];
        }
        ip[3] += size -1;
        ip[2] += ip[3] / 256;
        ip[3] %= 256;
        ip[1] += ip[2] / 256;
        ip[2] %= 256;
        this.broadcast = new IPAddress(ip);
}
}