"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeRequestParams = void 0;
const mergeRequestParams = (baseURL, requestParams, headers, paramsSerializer) => {
    const { handleAutoRedirect, headers: requestHeaders, method, query, body, url } = requestParams;
    return Object.assign(Object.assign(Object.assign(Object.assign({ baseURL,
        url,
        method, headers: Object.assign(Object.assign({}, requestHeaders), headers) }, (handleAutoRedirect === false && { maxRedirects: 0 })), (query && { params: query })), (body && { data: body })), (paramsSerializer && { paramsSerializer }));
};
exports.mergeRequestParams = mergeRequestParams;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2UtcmVxdWVzdC1wYXJhbXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbC9tZXJnZS1yZXF1ZXN0LXBhcmFtcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFLTyxNQUFNLGtCQUFrQixHQUFHLENBQzlCLE9BQWUsRUFDZixhQUFtQyxFQUNuQyxPQUFxQixFQUNyQixnQkFBMEMsRUFDbkIsRUFBRTtJQUN6QixNQUFNLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxhQUFhLENBQUM7SUFFaEcsaUVBQ0ksT0FBTztRQUNQLEdBQUc7UUFDSCxNQUFNLEVBQ04sT0FBTyxrQ0FDQSxjQUFjLEdBQ2QsT0FBTyxLQUVYLENBQUMsa0JBQWtCLEtBQUssS0FBSyxJQUFJLEVBQUUsWUFBWSxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQ3JELENBQUMsS0FBSyxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLEdBQzVCLENBQUMsSUFBSSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEdBQ3hCLENBQUMsZ0JBQWdCLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLEVBQy9DO0FBQ04sQ0FBQyxDQUFDO0FBckJXLFFBQUEsa0JBQWtCLHNCQXFCN0IifQ==