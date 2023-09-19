
function PreformSubnet(IP, Subnets, Masking)
{
    Subnets = Subnets.value;
    IP = IP.value;
    let masking = (Masking.value == 'true');

    Subnets = Subnets.split(" ");
    let networks = new Array();
    for(let i=0; i<Subnets.length; i++)
    {
        networks.push(new Network(parseInt(Subnets[i])));
    }
    new SubnetMasking(IP, networks, masking);
    println("<HR>");
}


