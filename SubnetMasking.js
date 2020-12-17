class SubnetMasking {
    constructor(IP, networks, vlsm) {
        this.ipAddress = new IPAddress(IP);
        this.networks = networks;
        this.octet = 8;
        this.subnets = new Array();

        let maxNetworks = networks.length;
        let maxSize = 256;
        let value = 0;

        let anotherCheck = 256;
        let cidr = 0;


        networks.sort(function(a, b){return b.getConnections() - a.getConnections()});
        switch (this.ipAddress.getIpClass())
        {
            case 'C': {
                this.octet = 8;
                value = this.calculateValue();
                cidr = 24 +  this.octet - value;
                break;
            }
            case 'B':
            {
                this.octet = 16;
                value = this.calculateValue();
                cidr = 16 +  this.octet - value;
                maxSize = Math.pow(256,2);
                anotherCheck *=2;
                break;
            }
            case 'A':
            {
                this.octet = 24;
                value = this.calculateValue();
                cidr = 8 +  this.octet - value;
                maxSize = Math.pow(256,2);
                anotherCheck *=2;
                break;
            }
        }

        let maxHost = networks[0].getConnections();

        let subnetType = "Fixed Length Subnet Masking";
        if(vlsm)
            subnetType = "Variable Length Subnet Masking"

        printHeading(subnetType, true, "h2");

        printHeading("IP: " + this.ipAddress.toString(), true);
        printHeading("Class " + this.ipAddress.getIpClass(), true, "h5");




        printHeading("Calculations")
        println("Max hosts = " + maxHost);
        println("2<sup>n</sup> - 2 ≥ "  + maxHost);
        println("2<sup>"+value.toString()+"</sup> - 2 ≥ " +( Math.pow(2,value) - 2));
        println("n ≥ " + value);
        println("");

        this.ipAddress.shiftValue(value);
        printHeading("CIDR/Subnet Mask: "+this.ipAddress.getSubnet()+ "/" + cidr, true, "h4");


        if(vlsm) createTable("Subnet,Hosts,Network IP,Broadcast IP,IP Range");
        else createTable("Subnet,Network IP,Broadcast IP,IP Range");


        let size = Math.pow(2, value);
        let counterC = 0;

        for(let i=0; i<maxSize; i+=size)
        {
            if(vlsm)
            {
                size = Math.pow(2, value);
            }
            let ip = new Array();
            for(let x=0; x<4; x++)
            ip[x]=0;
            for(let x=0; x<4 - (anotherCheck/256); x++)
            {
                ip[x] = this.ipAddress.ip[x];
            }
            ip[3] += i;
            ip[2] += ip[3] / 256;
            ip[3] %= 256;
            ip[1] += ip[2] / 256;
            ip[2] %= 256;

            let host = new IPAddress(ip);
            let subnet = new Subnet(host, cidr, size);
            this.subnets.push(subnet);
            counterC++;
            let string = counterC;
            if(vlsm) string += "," +this.networks[0].getConnections()+ " (n -> "+subnet.size+")";
            string +="," + subnet.host + "/" + cidr;
            string +="," + subnet.broadcast + "/" + cidr;
            string +="," + subnet.range[0] + "/"+cidr+" to " + subnet.range[subnet.range.length-1] + "/" + cidr;
            addTableRow(string);
            if(counterC >= maxNetworks) break;
            if(vlsm)
            {
                networks.shift();
                value = this.calculateValue();
            }
        }
    }

    calculateValue()
    {
        for(let i = 0; i<this.octet; i++)
        if(Math.pow(2.0, i) - 2 >= this.networks[0].getConnections())
            return i;
        return 0;
    }
}
