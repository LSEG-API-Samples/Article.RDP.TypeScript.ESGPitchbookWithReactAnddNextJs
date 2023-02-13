FROM golang:1.19.3-alpine3.16

WORKDIR /app
COPY main.go go.mod go.sum 8955743.ssh /app/

RUN go build -o newsfetch

CMD ["/app/newsfetch"]
