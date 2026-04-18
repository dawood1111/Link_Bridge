public class FinancialItem
{
    public int Id { get; set; }
     public string ItemNo { get; set; }        // 1, 2, A.1 etc.
    public string Description { get; set; }   // what the service/product is
    public string Unit { get; set; }          // m², hr, EA, LS, month, page...
    public decimal Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal Total => Quantity * UnitPrice;
    public QuotationRequest? QuotationsRequest { get; set; }
    public int QuotationRequestId { get; set; }
}