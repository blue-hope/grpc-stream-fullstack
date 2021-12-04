FROM envoyproxy/envoy-dev:70a5f295da789610b9d078015f43e39c6a76d4b6
COPY ./envoy.yaml /envoy.yaml
CMD /usr/local/bin/envoy -c envoy.yaml -l debug --log-path /tmp/envoy_info.log