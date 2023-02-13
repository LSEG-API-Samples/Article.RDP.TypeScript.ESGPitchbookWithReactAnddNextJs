package main

import (
	"encoding/json"
	"fmt"
	"github.com/pkg/sftp"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"sort"
	"strconv"
	"strings"
	"time"
)
import "golang.org/x/crypto/ssh"
import "log"

func connect() (*sftp.Client, *ssh.Client, error) {
	var auths []ssh.AuthMethod

	privateKeyBytes, err := os.ReadFile("8955743.ssh")
	if err != nil {
		return nil, nil, err
	}

	// Add private key
	privateKey, err := ssh.ParsePrivateKey(privateKeyBytes)
	if err != nil {
		return nil, nil, err
	}

	auths = append(auths, ssh.PublicKeys(privateKey))

	config := ssh.ClientConfig{
		User:            "8955743",
		Auth:            auths,
		HostKeyCallback: ssh.InsecureIgnoreHostKey(),
	}
	addr := fmt.Sprintf("%s:%d", "sftp.news.refinitiv.com", 22)
	conn, err := ssh.Dial("tcp", addr, &config)
	if err != nil {
		log.Fatalf("unable to connect to [%s]: %w", addr, err)
	}

	c, err := sftp.NewClient(conn, sftp.MaxPacket(1<<15))
	if err != nil {
		log.Fatalf("unable to start sftp subsytem: %w", err)
	}

	return c, conn, nil
}

const knownDir = "/mrn-mi-w/PRO/MI4/CMPNY/WDAI_UDAI/daily"

type DataRecord struct {
	ID              string `json:"id"`
	AssetCode       string `json:"assetCode"`
	Ticker          string `json:"ticker"`
	WindowTimestamp string `json:"windowTimestamp"`
	DataType        string `json:"dataType"`
	SystemVersion   string `json:"systemVersion"`

	Mentions int64 `json:"mentions"`
	Buzz     int64 `json:"buzz"`

	Sentiment               *float64 `json:"sentiment"`
	Negative                *float64 `json:"negative"`
	Positive                *float64 `json:"positive"`
	Optimism                *float64 `json:"optimism"`
	Pessimism               *float64 `json:"pessimism"`
	Joy                     *float64 `json:"joy"`
	LoveHate                *float64 `json:"loveHate"`
	Trust                   *float64 `json:"trust"`
	Anger                   *float64 `json:"anger"`
	Disagreement            *float64 `json:"disagreement"`
	Fear                    *float64 `json:"fear"`
	Gloom                   *float64 `json:"gloom"`
	Stress                  *float64 `json:"stress"`
	Surprise                *float64 `json:"surprise"`
	TimeUrgency             *float64 `json:"timeUrgency"`
	Uncertainty             *float64 `json:"uncertainty"`
	Violence                *float64 `json:"violence"`
	EmotionVsFact           *float64 `json:"emotionVsFact"`
	ShortVsLongTerm         *float64 `json:"shortVsLongTerm"`
	LongShort               *float64 `json:"longShort"`
	LongShortForecast       *float64 `json:"longShortForecast"`
	PriceDirection          *float64 `json:"priceDirection"`
	PriceDown               *float64 `json:"priceDown"`
	PriceForecast           *float64 `json:"priceForecast"`
	PriceUp                 *float64 `json:"priceUp"`
	MarketRisk              *float64 `json:"marketRisk"`
	TopVsBottom             *float64 `json:"topVsBottom"`
	OvervaluedVsUndervalued *float64 `json:"overvaluedVsUndervalued"`
	Volatility              *float64 `json:"volatility"`
	AnalystRating           *float64 `json:"analystRating"`
	DebtDefault             *float64 `json:"debtDefault"`
	Dividends               *float64 `json:"dividends"`
	Innovation              *float64 `json:"innovation"`
	EarningsDirection       *float64 `json:"earningsDirection"`
	EarningsForecast        *float64 `json:"earningsForecast"`
	AccountingSentiment     *float64 `json:"accountingSentiment"`
	AccountingNegative      *float64 `json:"accountingNegative"`
	AccountingPositive      *float64 `json:"accountingPositive"`
	AccountingRestatement   *float64 `json:"accountingRestatement"`
	RevenueDirection        *float64 `json:"revenueDirection"`
	RevenueForecast         *float64 `json:"revenueForecast"`
	IntangiblesSentiment    *float64 `json:"intangiblesSegment"`
	ProductSentiment        *float64 `json:"productSegment"`
	LaborDispute            *float64 `json:"laborDispute"`
	Layoffs                 *float64 `json:"layoffs"`
	Litigation              *float64 `json:"litigation"`
	InsiderLongShort        *float64 `json:"insiderLongShort"`
	ManagementSentiment     *float64 `json:"managementSentiment"`
	ManagementChange        *float64 `json:"managementChange"`
	ManagementTrust         *float64 `json:"managementTrust"`
	Partnership             *float64 `json:"partnership"`
	Mergers                 *float64 `json:"mergers"`
	CyberCrime              *float64 `json:"cyberCrime"`
	FutureVsPast            *float64 `json:"futureVsPast"`
}

func parseFloat(s string) *float64 {
	if s == "" {
		return nil
	}
	f, err := strconv.ParseFloat(s, 64)
	if err != nil {
		return nil
	}

	return &f
}

func parseInt(s string) int64 {
	if s == "" {
		return 0
	}
	f, err := strconv.ParseFloat(s, 64)
	if err != nil {
		return 0
	}

	return int64(f)
}

func parseFile(s string) ([]DataRecord, error) {
	lines := strings.Split(s, "\n")
	if len(lines) < 1 {
		return nil, fmt.Errorf("invalid file")
	}

	if len(lines) == 1 {
		return nil, nil
	}

	dataRecords := make([]DataRecord, len(lines)-1)
	for i, line := range lines[1:] {
		values := strings.Split(line, "\t")

		if len(values) < 62 {
			continue
		}

		dataRecord := DataRecord{
			ID:                      values[0],
			AssetCode:               values[1],
			Ticker:                  values[2],
			WindowTimestamp:         values[3],
			DataType:                values[4],
			SystemVersion:           values[5],
			Mentions:                parseInt(values[6]),
			Buzz:                    parseInt(values[7]),
			Sentiment:               parseFloat(values[8]),
			Negative:                parseFloat(values[9]),
			Positive:                parseFloat(values[10]),
			Optimism:                parseFloat(values[11]),
			Pessimism:               parseFloat(values[12]),
			Joy:                     parseFloat(values[13]),
			LoveHate:                parseFloat(values[14]),
			Trust:                   parseFloat(values[15]),
			Anger:                   parseFloat(values[16]),
			Disagreement:            parseFloat(values[17]),
			Fear:                    parseFloat(values[18]),
			Gloom:                   parseFloat(values[19]),
			Stress:                  parseFloat(values[20]),
			Surprise:                parseFloat(values[21]),
			TimeUrgency:             parseFloat(values[22]),
			Uncertainty:             parseFloat(values[23]),
			Violence:                parseFloat(values[24]),
			EmotionVsFact:           parseFloat(values[25]),
			ShortVsLongTerm:         parseFloat(values[26]),
			LongShort:               parseFloat(values[27]),
			LongShortForecast:       parseFloat(values[28]),
			PriceDirection:          parseFloat(values[29]),
			PriceDown:               parseFloat(values[30]),
			PriceForecast:           parseFloat(values[31]),
			PriceUp:                 parseFloat(values[32]),
			MarketRisk:              parseFloat(values[33]),
			TopVsBottom:             parseFloat(values[34]),
			OvervaluedVsUndervalued: parseFloat(values[35]),
			Volatility:              parseFloat(values[36]),
			AnalystRating:           parseFloat(values[37]),
			DebtDefault:             parseFloat(values[38]),
			Dividends:               parseFloat(values[39]),
			Innovation:              parseFloat(values[40]),
			EarningsDirection:       parseFloat(values[41]),
			EarningsForecast:        parseFloat(values[42]),
			AccountingSentiment:     parseFloat(values[43]),
			AccountingNegative:      parseFloat(values[44]),
			AccountingPositive:      parseFloat(values[45]),
			AccountingRestatement:   parseFloat(values[46]),
			RevenueDirection:        parseFloat(values[47]),
			RevenueForecast:         parseFloat(values[48]),
			IntangiblesSentiment:    parseFloat(values[49]),
			ProductSentiment:        parseFloat(values[50]),
			LaborDispute:            parseFloat(values[51]),
			Layoffs:                 parseFloat(values[52]),
			Litigation:              parseFloat(values[53]),
			InsiderLongShort:        parseFloat(values[54]),
			ManagementSentiment:     parseFloat(values[55]),
			ManagementChange:        parseFloat(values[56]),
			ManagementTrust:         parseFloat(values[57]),
			Partnership:             parseFloat(values[58]),
			Mergers:                 parseFloat(values[59]),
			CyberCrime:              parseFloat(values[60]),
			FutureVsPast:            parseFloat(values[61]),
		}
		dataRecords[i] = dataRecord
	}

	return dataRecords, nil
}

func findCompanyRecords(records []DataRecord, companyPermId string) []DataRecord {
	tmp := make([]DataRecord, 0)

	for _, record := range records {
		if record.AssetCode == companyPermId {
			tmp = append(tmp, record)
		}
	}

	return tmp
}

func fetchLatestFile(client *sftp.Client) ([]DataRecord, error) {
	type sftpFile struct {
		name      string
		size      int64
		createdAt time.Time
	}

	availableFiles := make([]sftpFile, 0)
	w := client.Walk(knownDir)

	for w.Step() {
		if w.Err() != nil {
			continue
		}
		if w.Stat().IsDir() {
			continue
		}

		fileName := filepath.Base(w.Path())
		fileNameParts := strings.Replace(fileName, "PRO.Live.CMPNY.WDAI_UDAI.", "", 1)
		fileNameParts = strings.Split(strings.Replace(fileNameParts, filepath.Ext(fileName), "", 1), ".")[0]

		// parse date, formatted as yyyymmdd
		createdAt, err := time.Parse("20060102", fileNameParts)
		if err != nil {
			return nil, fmt.Errorf("unable to parse date from file name: %w", err)
		}

		availableFiles = append(availableFiles, sftpFile{
			name:      fileName,
			size:      w.Stat().Size(),
			createdAt: createdAt,
		})
	}

	// get the latest file by sorting by date
	sort.SliceStable(availableFiles, func(i, j int) bool {
		return availableFiles[i].createdAt.After(availableFiles[j].createdAt)
	})

	if len(availableFiles) < 1 {
		return nil, nil
	}

	// get the latest file
	latestFile := availableFiles[0]

	f, err := client.Open(filepath.Join(knownDir, latestFile.name))
	if err != nil {
		return nil, fmt.Errorf("unable to open file: %w", err)
	}

	// read the file
	readFile := make([]byte, latestFile.size)
	_, err = f.Read(readFile)
	if err != nil {
		return nil, fmt.Errorf("unable to read file: %w", err)
	}

	records, err := parseFile(string(readFile))
	if err != nil {
		return nil, fmt.Errorf("unable to parse file: %w", err)
	}

	return records, nil
}

func main() {
	client, conn, err := connect()
	if err != nil {
		log.Fatalf("unable to connect: %w", err)
	}
	defer func() {
		_ = client.Close()
		_ = conn.Close()
	}()

	records, err := fetchLatestFile(client)
	if err != nil {
		log.Fatalf("unable to fetch latest file: %w", err)
	}

	http.HandleFunc("/data", func(w http.ResponseWriter, r *http.Request) {
		reqUrl, err := url.Parse(r.URL.String())
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		queryParams := reqUrl.Query()
		permId := queryParams.Get("permId")

		if permId != "" {
			foundRecords := findCompanyRecords(records, permId)

			if len(foundRecords) > 0 {
				w.Header().Set("Content-Type", "application/json")
				w.Header().Set("Cache-Control", "public, max-age=3600")
				err := json.NewEncoder(w).Encode(foundRecords)
				if err != nil {
					return
				}
				return
			}

			w.WriteHeader(http.StatusNotFound)
			return
		}

		permIds := queryParams.Get("permIds")
		if permIds != "" {
			permIds := strings.Split(permIds, ",")
			foundRecords := make([]DataRecord, 0)

			for _, permId := range permIds {
				foundRecords = append(foundRecords, findCompanyRecords(records, permId)...)
			}

			if len(foundRecords) > 0 {
				w.Header().Set("Content-Type", "application/json")
				w.Header().Set("Cache-Control", "public, max-age=3600")
				err := json.NewEncoder(w).Encode(foundRecords)
				if err != nil {
					return
				}
				return
			}

			w.WriteHeader(http.StatusNotFound)
			return
		}

	})

	fmt.Println("Listening on port 8080")

	err = http.ListenAndServe(":8080", http.DefaultServeMux)
	if err != nil {
		log.Fatalf("unable to start server: %w", err)
	}
}
