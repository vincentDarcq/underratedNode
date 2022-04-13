#!/bin/bash
#
# Generate CA certificate from a pre-existing key that works with Chrome 58+.
#

input_key=server.key
output_crt=server.crt
ssl_config=/System/Volumes/Data/private/etc/ssl/openssl.cnf

ssl_subj=$(cat <<EOF
/C=FR
/ST=Paris
/L=Paris
/emailAddress=
/O=AAA
/OU=AAA
/CN=server.mydomain.local
EOF
)

ssl_custom=$(cat <<EOF
[ v3_ca_with_san ]
subjectKeyIdentifier=hash
authorityKeyIdentifier=keyid:always,issuer
basicConstraints = critical,CA:true
subjectAltName = @alt_names
[alt_names ]
DNS.1 = server
DNS.2 = www
DNS.3 = server.mydomain.local
DNS.4 = www.mydomain.local
IP.1  = 192.168.0.2
EOF
)

openssl req \
    -key "$input_key" \
    -x509 \
    -nodes \
    -new \
    -out "$output_crt" \
    -subj $(echo -n $ssl_subj|tr -d ' ') \
    -reqexts 'v3_ca_with_san' \
    -extensions 'v3_ca_with_san' \
    -config <(cat "$ssl_config" \
            <(printf "$ssl_custom")) \
    -sha256 \
    -days 10000

# Restart Apache. I did this for quick testing. You don't need to include this.
systemctl restart apache2