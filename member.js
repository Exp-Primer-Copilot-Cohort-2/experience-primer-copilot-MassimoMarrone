function skillsMember()
{
    this.skills = [];
    this.addSkill = function(skill)
    {
        this.skills.push(skill);
    }
    this.removeSkill = function(skill)
    {
        this.skills.remove(skill);
    }
}
