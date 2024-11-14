#* ./webservices/api/${Package}/${ResourceName}Ws *#
#set($ResourceName_LowerCase = $ResourceName.substring(0,1).toLowerCase() + $ResourceName.substring(1))
#set($ServiceVariable = ${ResourceName_LowerCase} + "Service")
#set($ServiceClass = ${ResourceName} + "Service")
#set($ResourceNameRequest = ${ResourceName} + "Request")
#set($ResourceNameResponse = ${ResourceName} + "Response")
#set($ResourceNamePutResponse = ${ResourceName} + "Response")
#set($ResourceNameRequestVariable = $ResourceNameRequest.substring(0,1).toLowerCase() + $ResourceNameRequest.substring(1))

#if (${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end

import javax.inject.Inject;
import javax.inject.Singleton;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/${ResourceName_LowerCase}" )
@Tag(name = "${ResourceName}" , description = "Manage ${ResourceName_LowerCase} web-services" )
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Singleton
// TODO Insert @RestrictTo or @PublicApi
public class ${ResourceName}Ws {
    private final ${ServiceClass} ${ServiceVariable};

    @Inject
    public ${ResourceName}Ws(${ServiceClass} ${ServiceVariable}) {
        this.${ServiceVariable} = ${ServiceVariable};
    }

    @GET
    @Operation(description = "Fetch ${ResourceName_LowerCase}s")
    public List<$ResourceNameResponse> fetch${ResourceName}s() {
        return ${ServiceVariable}.fetch${ResourceName}s();
    }

    @GET
    @Path("/{id}" )
    @Operation(description = "Fetch ${ResourceName_LowerCase} by id")
    public $ResourceNameResponse fetch${ResourceName}(
        @Parameter(required = true) @PathParam("id") Long id
    ) {
        return ${ServiceVariable}.fetch${ResourceName}ById(id);
    }

    @POST
    @Operation(description = "Create ${ResourceName_LowerCase}")
    public ${ResourceNameResponse} create${ResourceName}(
        $ResourceNameRequest $ResourceNameRequestVariable
    ) {
        return ${ServiceVariable}.create${ResourceName}($ResourceNameRequestVariable);
    }

    @PUT
    @Path("/{id}" )
    @Operation(description = "Update ${ResourceName_LowerCase}")
    public ${ResourceNamePutResponse} update${ResourceName}ById(
        $ResourceNameRequest $ResourceNameRequestVariable,
        @Parameter(required = true) @PathParam("id") Long id
    ) {
        return ${ServiceVariable}.update${ResourceName}(id, $ResourceNameRequestVariable);
    }

    @DELETE
    @Operation(description = "Delete ${ResourceName_LowerCase} by id")
    @Path("/{id}" )
    public void delete${ResourceName}ById(
        @Parameter(required = true) @PathParam("id") Long id
    ) {
        ${ServiceVariable}.delete${ResourceName}ById(id);
    }
}