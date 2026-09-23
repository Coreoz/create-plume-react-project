#* ./services/${Package}/${ResourceName}Service *#

#if (${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end
#set($ResourceName_LowerCase = $ResourceName.substring(0,1).toLowerCase() + $ResourceName.substring(1))
#set($Dao = ${ResourceName} + "Dao")
#set($DaoVariable = ${ResourceName_LowerCase} + "Dao")
#set($ResourceNameRequest = ${ResourceName} + "Request")
#set($ResourceNameRequestVariable = $ResourceNameRequest.substring(0,1).toLowerCase() + $ResourceNameRequest.substring(1))

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.List;

@Singleton
public class ${ResourceName}Service {
    private final $Dao $DaoVariable;

    @Inject
    private ${ResourceName}Service($Dao $DaoVariable) {
        this.${DaoVariable} = $DaoVariable;
    }

    public List<${ResourceName}> fetch${ResourceName}s() {
        return ${DaoVariable}.fetch${ResourceName}s();
    }

    public ${ResourceName} fetch${ResourceName}ById(Long id) {
        return ${DaoVariable}.findById(id);
    }

    public ${ResourceName} create${ResourceName}(
        $ResourceNameRequest $ResourceNameRequestVariable
    ) {
        // TODO Map request to ${ResourceName}
        return ${DaoVariable}.save();
    }

    public ${ResourceName} update${ResourceName}(
        Long id,
        $ResourceNameRequest $ResourceNameRequestVariable
    ) {
        // TODO Map request to ${ResourceName}
        return ${DaoVariable}.save();
    }

    public long delete${ResourceName}ById(Long id) {
        return ${DaoVariable}.delete(id);
    }
}
