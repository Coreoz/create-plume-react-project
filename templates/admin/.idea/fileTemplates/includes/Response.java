#* ./webservices/api/${Package}/data/${ResourceName}Response *#
#* @vtlvariable name="PACKAGE_NAME" type="java.lang.String" *#
#* @vtlvariable name="ResourceName" type="java.lang.String" *#
#if (${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end

public record ${ResourceName}Response() {}
