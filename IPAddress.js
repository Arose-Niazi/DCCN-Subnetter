class IPAddress {

    constructor(ip) {
        if(typeof(ip) === "string")
        {
            let separator = ".";
            if(ip.search("\\,") !== -1)
                separator = ",";
           this.ip = ip.split(separator);
        }
        else
            this.ip = ip;
        for (let i = 0; i < this.ip.length; i++) {
            this.ip[i] = parseInt(this.ip[i]);
        }

        //println("IP: "+this.ip[1]);

        if(this.ip.length !== 4) return println("Invalid IP Entered: " + this.ip);

        for(let i=0; i<4; i++)
        {
            this.ip[i] %= 256;
        }

        if(this.ip[0] >= 1)
            this.ipClass = 'A';
        if(this.ip[0] >= 128)
            this.ipClass = 'B';
        if(this.ip[0] >= 192)
            this.ipClass = 'C';
        if(this.ip[0] >= 240)
            this.ipClass = 'D';
    }

    shiftValue(value)
    {
        switch (this.ipClass)
        {
            case 'A':
            {
                if(value > 16)
                {
                    this.ip[1] = 1;
                    for(let i = value + 1; i<24; i++)
                    {
                        this.ip[1] <<= 1;
                        this.ip[1] |= 1;
                    }
                    this.ip[1] <<= value - 16;
                }
            }
            case 'B':
            {
                if(value > 8)
                {
                    this.ip[2] = 1;
                    for(let i = value + 1; i<16; i++)
                    {
                        this.ip[2] <<= 1;
                        this.ip[2] |= 1;
                    }
                    this.ip[2] <<= value - 8;
                }
            }
            case 'C':
            {
                this.ip[3] = 1;
                for(let i = value + 1; i<8; i++)
                {
                    this.ip[3] <<= 1;
                    this.ip[3] |= 1;
                }
                this.ip[3] <<= value;
            }
        }
        for(let i=0; i<4; i++)
            this.ip[i] %= 256;
    }

    getIpClass() {
        return this.ipClass;
    }

    toString() {
        return this.ip[0] + "." + this.ip[1] + "." + this.ip[2] + "." + this.ip[3];
    }

    getSubnet() {
        return "255." + ((this.ipClass == 'A')?this.ip[1]:"255") + "." +  ((this.ipClass <= 'B')?this.ip[2]:"255") + "." + this.ip[3];
    }

}